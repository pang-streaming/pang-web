import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRM, VRMUtils, VRMLoaderPlugin, VRMHumanoid } from "@pixiv/three-vrm";
import * as Kalidokit from "kalidokit";

interface ThreeCanvasProps {
  vrmUrl: string | null;
  isCameraEnabled: boolean;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  isVisible: boolean;
  width: number;
  height: number;
}

// Animate Rotation Helper function
const rigRotation = (vrm: VRM, name: keyof VRMHumanoid["humanBones"], rotation = { x: 0, y: 0, z: 0 }, dampener = 1, lerpAmount = 0.3) => {
  if (!vrm.humanoid) return;

  const Part = vrm.humanoid.getNormalizedBoneNode(name);
  if (!Part) return;

  const euler = new THREE.Euler(rotation.x * dampener, rotation.y * dampener, rotation.z * dampener, "XYZ");
  const quaternion = new THREE.Quaternion().setFromEuler(euler);
  Part.quaternion.slerp(quaternion, lerpAmount);
};

// Animate Position Helper Function
const rigPosition = (vrm: VRM, name: keyof VRMHumanoid["humanBones"], position = { x: 0, y: 0, z: 0 }, dampener = 1, lerpAmount = 0.3) => {
  if (!vrm.humanoid) return;
  
  const Part = vrm.humanoid.getNormalizedBoneNode(name);
  if (!Part) return;
  
  const vector = new THREE.Vector3(position.x * dampener, position.y * dampener, position.z * dampener);
  Part.position.lerp(vector, lerpAmount);
};

const ThreeCanvas = ({ vrmUrl, isCameraEnabled, onCanvasReady, isVisible, width, height }: ThreeCanvasProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVrm = useRef<VRM | null>(null);
  const [isHolisticLoaded, setIsHolisticLoaded] = useState(false);
  const oldLookTarget = useRef(new THREE.Euler());
  
  useEffect(() => {
    if (currentVrm.current) {
      currentVrm.current.scene.visible = isVisible;
    }
  }, [isVisible]);

  // 자동 깜빡임 관련 상태
  const {current} = useRef<number | null>(null);
  const lastBlinkTime = useRef<number>(0);
  const nextBlinkDelay = useRef<number>(0);
  
  // 자동 깜빡임 함수
  const startAutoBlink = (vrm: VRM) => {
    if (!vrm.expressionManager) return;
  
    const now = Date.now();
    
    // 첫 번째 깜빡임이거나 다음 깜빡임 시간이 되었을 때
    if (lastBlinkTime.current === 0 || now - lastBlinkTime.current >= nextBlinkDelay.current) {
      // 깜빡임 애니메이션
      const blinkDuration = 150; // 깜빡임 지속 시간 (ms)
      const blinkValue = 1.0; // 깜빡임 강도
    
      // 깜빡임 시작
      vrm.expressionManager.setValue("blink", blinkValue);
      
      // 깜빡임 종료
      setTimeout(() => {
        if (vrm.expressionManager) {
          vrm.expressionManager.setValue("blink", 0);
        }
      }, blinkDuration);
    
      lastBlinkTime.current = now;
    
      // 다음 깜빡임까지의 랜덤 시간 (2-6초)
      nextBlinkDelay.current = 2000 + Math.random() * 4000;
    }
  };

// Animate Face Helper Function
  const rigFace = (vrm: VRM, riggedFace: any) => {
    if (!vrm.expressionManager || !vrm.lookAt || !vrm.humanoid) return;
  
    rigRotation(vrm, "neck", riggedFace.head, 0.7);
  
    const expressionManager = vrm.expressionManager;
    // Eye blinking
    const stabilizedBlink = Kalidokit.Face.stabilizeBlink(
      { l: 1 - riggedFace.eye.l, r: 1 - riggedFace.eye.r },
      riggedFace.head.y
    );
    expressionManager.setValue("blink", stabilizedBlink.l);
  
    // Mouth movements
    const lerpVal = 0.5;
    expressionManager.setValue("ih", Kalidokit.Vector.lerp(riggedFace.mouth.shape.I, expressionManager.getValue("i") || 0, lerpVal));
    expressionManager.setValue("aa", Kalidokit.Vector.lerp(riggedFace.mouth.shape.A, expressionManager.getValue("a") || 0, lerpVal));
    expressionManager.setValue("ee", Kalidokit.Vector.lerp(riggedFace.mouth.shape.E, expressionManager.getValue("e") || 0, lerpVal));
    expressionManager.setValue("oh", Kalidokit.Vector.lerp(riggedFace.mouth.shape.O, expressionManager.getValue("o") || 0, lerpVal));
    expressionManager.setValue("ou", Kalidokit.Vector.lerp(riggedFace.mouth.shape.U, expressionManager.getValue("u") || 0, lerpVal));
  
    // Pupil tracking
    let lookTarget = new THREE.Euler(
      Kalidokit.Vector.lerp(oldLookTarget.current.x, riggedFace.pupil.y, 0.4),
      Kalidokit.Vector.lerp(oldLookTarget.current.y, riggedFace.pupil.x, 0.4),
      0,
      "XYZ"
    );
    oldLookTarget.current.copy(lookTarget);
    if (vrm.lookAt.target) {
      vrm.lookAt.target.position.set(Math.sin(lookTarget.y) * 2, -Math.sin(lookTarget.x) * 2, -5);
    }
  };

  const animateVRM = (vrm: VRM, results: any) => {
    if (!currentVrm.current) return;

    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      const faceLandmarks = results.faceLandmarks;
      const pose3DLandmarks = results.ea;
      const pose2DLandmarks = results.poseLandmarks;
      const leftHandLandmarks = results.rightHandLandmarks;
      const rightHandLandmarks = results.leftHandLandmarks;

      // Animate Face
      if (faceLandmarks) {
        riggedFace = Kalidokit.Face.solve(faceLandmarks, { runtime: "mediapipe", video: videoElement });
        if (riggedFace) rigFace(vrm, riggedFace);
      }
      
      // Animate Pose
      if (pose2DLandmarks && pose3DLandmarks) {
        riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, { runtime: "mediapipe", video: videoElement });
        if (riggedPose) {
          rigRotation(vrm, "hips", riggedPose.Hips.rotation, 0.3);
          rigPosition(vrm, "hips", {
            x: -riggedPose.Hips.position.x,
            y: riggedPose.Hips.position.y + 1,
            z: -riggedPose.Hips.position.z,
          }, 1, 0.07);
      
          rigRotation(vrm, "chest", riggedPose.Spine, 0.25, 0.3);
          rigRotation(vrm, "spine", riggedPose.Spine, 0.45, 0.3);
          rigRotation(vrm, "rightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
          rigRotation(vrm, "rightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
          rigRotation(vrm, "leftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
          rigRotation(vrm, "leftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);
          rigRotation(vrm, "leftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
          rigRotation(vrm, "leftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
          rigRotation(vrm, "rightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
          rigRotation(vrm, "rightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);
      
          // Animate Hands
          if (leftHandLandmarks) {
            riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
            if (riggedLeftHand) {
              rigRotation(vrm, "leftHand", { z: riggedPose.LeftHand.z, y: riggedLeftHand.LeftWrist.y, x: riggedLeftHand.LeftWrist.x, });
              rigRotation(vrm, "leftRingProximal", riggedLeftHand.LeftRingProximal);
              rigRotation(vrm, "leftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
              rigRotation(vrm, "leftRingDistal", riggedLeftHand.LeftRingDistal);
              rigRotation(vrm, "leftIndexProximal", riggedLeftHand.LeftIndexProximal);
              rigRotation(vrm, "leftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
              rigRotation(vrm, "leftIndexDistal", riggedLeftHand.LeftIndexDistal);
              rigRotation(vrm, "leftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
              rigRotation(vrm, "leftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
              rigRotation(vrm, "leftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
              rigRotation(vrm, "leftThumbProximal", riggedLeftHand.LeftThumbProximal);
              rigRotation(vrm, "leftThumbDistal", riggedLeftHand.LeftThumbDistal);
              rigRotation(vrm, "leftLittleProximal", riggedLeftHand.LeftLittleProximal);
              rigRotation(vrm, "leftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
              rigRotation(vrm, "leftLittleDistal", riggedLeftHand.LeftLittleDistal);
            }
          }
          if (rightHandLandmarks) {
            riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
            if (riggedRightHand) {
              rigRotation(vrm, "rightHand", { z: riggedPose.RightHand.z, y: riggedRightHand.RightWrist.y, x: riggedRightHand.RightWrist.x, });
              rigRotation(vrm, "rightRingProximal", riggedRightHand.RightRingProximal);
              rigRotation(vrm, "rightRingIntermediate", riggedRightHand.RightRingIntermediate);
              rigRotation(vrm, "rightRingDistal", riggedRightHand.RightRingDistal);
              rigRotation(vrm, "rightIndexProximal", riggedRightHand.RightIndexProximal);
              rigRotation(vrm, "rightIndexIntermediate", riggedRightHand.RightIndexIntermediate);
              rigRotation(vrm, "rightIndexDistal", riggedRightHand.RightIndexDistal);
              rigRotation(vrm, "rightMiddleProximal", riggedRightHand.RightMiddleProximal);
              rigRotation(vrm, "rightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
              rigRotation(vrm, "rightMiddleDistal", riggedRightHand.RightMiddleDistal);
              rigRotation(vrm, "rightThumbProximal", riggedRightHand.RightThumbProximal);
              rigRotation(vrm, "rightThumbDistal", riggedRightHand.RightThumbDistal);
              rigRotation(vrm, "rightLittleProximal", riggedRightHand.RightLittleProximal);
              rigRotation(vrm, "rightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
              rigRotation(vrm, "rightLittleDistal", riggedRightHand.RightLittleDistal);
            }
          }
        }
      }
    } catch (error) {
      console.error("Kalidokit solve error:", error);
    }
  };
	
  useEffect(() => {
    const scriptId = "mediapipe-holistic-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const loadScript = () => {
      if (script) {
        setIsHolisticLoaded(true);
        return;
      }
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/holistic.js";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => setIsHolisticLoaded(true);
      script.onerror = () => {
        console.log("에러발생")
      };
      document.body.appendChild(script);
    };
    loadScript();
  }, []);

  useEffect(() => {
    if (!isCameraEnabled || !videoRef.current || !isHolisticLoaded) return;
  
    const videoElement = videoRef.current;
    let holistic: any;
    let holisticFrameId: number;
  
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        videoElement.srcObject = stream;
        await videoElement.play();
      } catch (error) {
        console.error("Failed to get user media", error);
        console.log("카메라 에러")
      }
    };

    const onResults = (results: any) => {
      if (!currentVrm.current) return;
      animateVRM(currentVrm.current, results);
    };
    setupCamera()

    let HolisticConstructor = (window as any).Holistic;
    if (!HolisticConstructor) {
      console.error("Holistic constructor not found on window object.");
      if (isHolisticLoaded) {
        console.log("초기화 에러")
      }
      return;
    }
    // Handle cases where the library might be nested under a .default property
    if (typeof HolisticConstructor.default === 'function') {
      HolisticConstructor = HolisticConstructor.default;
    }

    holistic = new HolisticConstructor({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
      },
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
      refineFaceLandmarks: true,
    });

    holistic.onResults(onResults);

    const sendToHolistic = async () => {
      if (videoElement.readyState >= 2) {
        await holistic.send({ image: videoElement });
      }
      holisticFrameId = requestAnimationFrame(sendToHolistic);
    };

    const loadedDataHandler = () => {
      sendToHolistic();
    };
    videoElement.addEventListener("loadeddata", loadedDataHandler);

    return () => {
      cancelAnimationFrame(holisticFrameId);
      holistic?.close();
      const stream = videoElement.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      videoElement.removeEventListener("loadeddata", loadedDataHandler);
    };
  }, [animateVRM, isCameraEnabled, isHolisticLoaded]);

  useEffect(() => {
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30.0, width / height, 0.1, 20.0);
    camera.position.set(0.0, 1.4, 1.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    onCanvasReady(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(1.0, 1.0, 1.0).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const urlToLoad = vrmUrl || "https://d1l5n2avb89axj.cloudfront.net/avatar-first.vrm";

    if (urlToLoad) {
      loader.load(
        urlToLoad,
        (gltf) => {
          const vrm = gltf.userData.vrm;
          if (currentVrm.current) {
            scene.remove(currentVrm.current.scene);
            VRMUtils.deepDispose(currentVrm.current.scene);
          }
          scene.add(vrm.scene);
          vrm.scene.rotation.y = Math.PI; // Rotate model to face camera
          currentVrm.current = vrm;

          // 자동 깜빡임 초기화
          lastBlinkTime.current = 0;
          nextBlinkDelay.current = 1000 + Math.random() * 2000; // 첫 깜빡임까지 1-3초

          // VRM 모델의 밝기 조정
          vrm.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (Array.isArray(child.material)) {
                child.material = child.material.map(mat => mat.clone());
              } else {
                child.material = child.material.clone();
              }

              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.emissiveIntensity = 0.2;
                    mat.envMapIntensity = 0.6;
                  }
                });
              } else if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.emissiveIntensity = 0.2;
                child.material.envMapIntensity = 0.6;
              }
            }
          });

          if(vrm.lookAt){
            vrm.lookAt.target = new THREE.Object3D();
            vrm.scene.add(vrm.lookAt.target);
          }

          if (!vrmUrl) {
            console.log("기본 아바타 로드됨")
          } else {
            console.log("아바타 로드됨")
          }
        },
        undefined,
        (error) => {
          console.error(error);
          console.log("로드 실패")
        }
      );
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (currentVrm.current) {
        // 자동 깜빡임 실행
        startAutoBlink(currentVrm.current);
        currentVrm.current.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (current) {
        clearTimeout(current);
      }
      if(currentVrm.current) {
        VRMUtils.deepDispose(currentVrm.current.scene);
      }
      renderer.dispose();
    };
  }, [current, height, onCanvasReady, vrmUrl, width]);

  return (
    <video ref={videoRef} style={{ display: "none" }}></video>
  );
};

export default ThreeCanvas;