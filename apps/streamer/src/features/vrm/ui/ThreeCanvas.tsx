import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRM, VRMUtils, VRMLoaderPlugin, VRMHumanoid } from "@pixiv/three-vrm";
import * as Kalidokit from "kalidokit";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

interface ThreeCanvasProps {
  vrmUrl: string | null;
  isCameraEnabled: boolean;
  selectedDevice: MediaDeviceInfo | null;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  isVisible: boolean;
  width: number;
  height: number;
}

// Animate Rotation Helper function
const rigRotation = (
  vrm: VRM,
  name: keyof VRMHumanoid["humanBones"],
  rotation = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!vrm.humanoid) return;

  const Part = vrm.humanoid.getNormalizedBoneNode(name);
  if (!Part) return;

  const euler = new THREE.Euler(
    rotation.x * dampener,
    rotation.y * dampener,
    rotation.z * dampener,
    "XYZ"
  );
  const quaternion = new THREE.Quaternion().setFromEuler(euler);
  Part.quaternion.slerp(quaternion, lerpAmount);
};

// Animate Position Helper Function
const rigPosition = (
  vrm: VRM,
  name: keyof VRMHumanoid["humanBones"],
  position = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!vrm.humanoid) return;

  const Part = vrm.humanoid.getNormalizedBoneNode(name);
  if (!Part) return;

  const vector = new THREE.Vector3(
    position.x * dampener,
    position.y * dampener,
    position.z * dampener
  );
  Part.position.lerp(vector, lerpAmount);
};

const ThreeCanvas = ({
  vrmUrl,
  isCameraEnabled,
  selectedDevice,
  onCanvasReady,
  isVisible,
  width,
  height,
}: ThreeCanvasProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVrm = useRef<VRM | null>(null);
  const poseDetectorRef = useRef<poseDetection.PoseDetector | null>(null);
  const handDetectorRef = useRef<handPoseDetection.HandDetector | null>(null);
  const faceDetectorRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const oldLookTarget = useRef(new THREE.Euler());

  useEffect(() => {
    if (currentVrm.current) {
      currentVrm.current.scene.visible = isVisible;
    }
  }, [isVisible]);


  const animateVRMWithBlazePose = useCallback(
    (vrm: VRM, blazePoseResult: poseDetection.Pose | null, hands: handPoseDetection.Hand[] = [], faces: faceLandmarksDetection.Face[] = []) => {
      if (!currentVrm.current || !blazePoseResult) return;

      const videoElement = videoRef.current;
      if (!videoElement) return;

      try {
        const worldLandmarks = blazePoseResult.keypoints3D;
        const landmarks2D = blazePoseResult.keypoints;

        if (!worldLandmarks || !landmarks2D) {
          return;
        }

        const getVisibility = (index: number) => landmarks2D[index]?.score || 0;
        const VISIBILITY_THRESHOLD = 0.5;

        const coreVisibility = [
          getVisibility(11),
          getVisibility(12),
          getVisibility(23),
          getVisibility(24),
        ];
        const avgCoreVisibility = coreVisibility.reduce((a, b) => a + b, 0) / coreVisibility.length;

        if (avgCoreVisibility < VISIBILITY_THRESHOLD) {
          return;
        }

        const filteredWorldLandmarks = worldLandmarks.filter(lm =>
          lm && typeof lm.x === 'number' && typeof lm.y === 'number' && typeof lm.z === 'number'
        );
        const filteredLandmarks2D = landmarks2D.filter(lm =>
          lm && typeof lm.x === 'number' && typeof lm.y === 'number'
        );

        if (filteredWorldLandmarks.length < 33 || filteredLandmarks2D.length < 33) {
          return;
        }

        const riggedPose = Kalidokit.Pose.solve(filteredWorldLandmarks, filteredLandmarks2D, {
          runtime: "tfjs",
          video: videoElement,
          imageSize: {
            width: videoElement.videoWidth,
            height: videoElement.videoHeight,
          },
        });
        if (riggedPose) {

          if (getVisibility(23) > VISIBILITY_THRESHOLD && getVisibility(24) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "hips", riggedPose.Hips.rotation, 0.5, 0.3);
            rigPosition(
              vrm,
              "hips",
              {
                x: -riggedPose.Hips.position.x,
                y: riggedPose.Hips.position.y + 1,
                z: -riggedPose.Hips.position.z,
              },
              1,
              0.07
            );
          }

          if (getVisibility(11) > VISIBILITY_THRESHOLD && getVisibility(12) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "chest", riggedPose.Spine, 0.5, 0.3);
            rigRotation(vrm, "spine", riggedPose.Spine, 0.5, 0.3);
          }

          if (getVisibility(12) > VISIBILITY_THRESHOLD && getVisibility(14) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "rightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
          }
          if (getVisibility(14) > VISIBILITY_THRESHOLD && getVisibility(16) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "rightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
          }
          if (getVisibility(11) > VISIBILITY_THRESHOLD && getVisibility(13) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "leftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
          }
          if (getVisibility(13) > VISIBILITY_THRESHOLD && getVisibility(15) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "leftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);
          }

          if (getVisibility(23) > VISIBILITY_THRESHOLD && getVisibility(25) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "leftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
          }
          if (getVisibility(25) > VISIBILITY_THRESHOLD && getVisibility(27) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "leftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
          }
          if (getVisibility(24) > VISIBILITY_THRESHOLD && getVisibility(26) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "rightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
          }
          if (getVisibility(26) > VISIBILITY_THRESHOLD && getVisibility(28) > VISIBILITY_THRESHOLD) {
            rigRotation(vrm, "rightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);
          }

          if (hands.length > 0) {
            hands.forEach((hand) => {
              if (hand.score && hand.score < 0.5) return;

              const handedness = hand.handedness === "Left" ? "Right" : "Left";
              const landmarks = (hand.keypoints3D || hand.keypoints).map(kp => ({
                x: kp.x || 0,
                y: kp.y || 0,
                z: kp.z || 0,
              }));
              const riggedHand = Kalidokit.Hand.solve(landmarks, handedness);

              if (riggedHand) {
                if (handedness === "Right") {
                  rigRotation(vrm, "rightHand", {
                    z: riggedPose.RightHand?.z || 0,
                    y: riggedHand.RightWrist.y,
                    x: riggedHand.RightWrist.x,
                  });
                  rigRotation(vrm, "rightRingProximal", riggedHand.RightRingProximal);
                  rigRotation(vrm, "rightRingIntermediate", riggedHand.RightRingIntermediate);
                  rigRotation(vrm, "rightRingDistal", riggedHand.RightRingDistal);
                  rigRotation(vrm, "rightIndexProximal", riggedHand.RightIndexProximal);
                  rigRotation(vrm, "rightIndexIntermediate", riggedHand.RightIndexIntermediate);
                  rigRotation(vrm, "rightIndexDistal", riggedHand.RightIndexDistal);
                  rigRotation(vrm, "rightMiddleProximal", riggedHand.RightMiddleProximal);
                  rigRotation(vrm, "rightMiddleIntermediate", riggedHand.RightMiddleIntermediate);
                  rigRotation(vrm, "rightMiddleDistal", riggedHand.RightMiddleDistal);
                  rigRotation(vrm, "rightThumbMetacarpal", riggedHand.RightThumbProximal);
                  rigRotation(vrm, "rightThumbProximal", riggedHand.RightThumbDistal);
                  rigRotation(vrm, "rightLittleProximal", riggedHand.RightLittleProximal);
                  rigRotation(vrm, "rightLittleIntermediate", riggedHand.RightLittleIntermediate);
                  rigRotation(vrm, "rightLittleDistal", riggedHand.RightLittleDistal);
                } else {
                  rigRotation(vrm, "leftHand", {
                    z: riggedPose.LeftHand?.z || 0,
                    y: riggedHand.LeftWrist.y,
                    x: riggedHand.LeftWrist.x,
                  });
                  rigRotation(vrm, "leftRingProximal", riggedHand.LeftRingProximal);
                  rigRotation(vrm, "leftRingIntermediate", riggedHand.LeftRingIntermediate);
                  rigRotation(vrm, "leftRingDistal", riggedHand.LeftRingDistal);
                  rigRotation(vrm, "leftIndexProximal", riggedHand.LeftIndexProximal);
                  rigRotation(vrm, "leftIndexIntermediate", riggedHand.LeftIndexIntermediate);
                  rigRotation(vrm, "leftIndexDistal", riggedHand.LeftIndexDistal);
                  rigRotation(vrm, "leftMiddleProximal", riggedHand.LeftMiddleProximal);
                  rigRotation(vrm, "leftMiddleIntermediate", riggedHand.LeftMiddleIntermediate);
                  rigRotation(vrm, "leftMiddleDistal", riggedHand.LeftMiddleDistal);
                  rigRotation(vrm, "leftThumbMetacarpal", riggedHand.LeftThumbProximal);
                  rigRotation(vrm, "leftThumbProximal", riggedHand.LeftThumbDistal);
                  rigRotation(vrm, "leftLittleProximal", riggedHand.LeftLittleProximal);
                  rigRotation(vrm, "leftLittleIntermediate", riggedHand.LeftLittleIntermediate);
                  rigRotation(vrm, "leftLittleDistal", riggedHand.LeftLittleDistal);
                }
              }
            });
          }

          if (faces.length > 0) {
            const face = faces[0];

            if (!face.box || (face.box.width < 50 || face.box.height < 50)) {
              return;
            }

            const landmarks = face.keypoints.map(kp => ({
              x: kp.x || 0,
              y: kp.y || 0,
              z: kp.z || 0,
            }));

            const riggedFace = Kalidokit.Face.solve(landmarks, {
              runtime: "tfjs",
              video: videoElement,
              imageSize: {
                width: videoElement.videoWidth,
                height: videoElement.videoHeight,
              },
              smoothBlink: true,
              blinkSettings: [0.25, 0.75],
            });

            if (riggedFace && vrm.expressionManager) {
              const expressionManager = vrm.expressionManager;

              rigRotation(vrm, "neck", riggedFace.head, 0.7);

              const eyeLookDown = THREE.MathUtils.clamp(riggedFace.eye.l + riggedFace.eye.r, 0, 1);
              expressionManager.setValue("lookDown", eyeLookDown);
              expressionManager.setValue("lookLeft", THREE.MathUtils.clamp(riggedFace.pupil.x, 0, 1));
              expressionManager.setValue("lookRight", THREE.MathUtils.clamp(-riggedFace.pupil.x, 0, 1));
              expressionManager.setValue("lookUp", THREE.MathUtils.clamp(-riggedFace.eye.l - riggedFace.eye.r, 0, 1));

              expressionManager.setValue("blinkLeft", 1 - riggedFace.eye.l);
              expressionManager.setValue("blinkRight", 1 - riggedFace.eye.r);

              expressionManager.setValue("aa", riggedFace.mouth.shape.A);
              expressionManager.setValue("ee", riggedFace.mouth.shape.E);
              expressionManager.setValue("ih", riggedFace.mouth.shape.I);
              expressionManager.setValue("oh", riggedFace.mouth.shape.O);
              expressionManager.setValue("ou", riggedFace.mouth.shape.U);

              expressionManager.update();
            }
          }
        }
      } catch (error) {
        console.error("[BlazePose] VRM 애니메이션 에러:", error);
      }
    },
    []
  );

  useEffect(() => {
    if (!isCameraEnabled || !videoRef.current) return;

    const videoElement = videoRef.current;
    let animationFrameId: number | undefined;
    let isRunning = true;

    const setupCamera = async () => {
      const existingStream = videoElement.srcObject as MediaStream;
      if (existingStream) {
        existingStream.getTracks().forEach(track => track.stop());
      }

      try {
        const videoConstrains: MediaTrackConstraints = {
          width: 640,
          height: 480,
        };
        if (selectedDevice) {
          videoConstrains.deviceId = { exact: selectedDevice.deviceId };
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstrains,
          audio: false,
        });
        videoElement.srcObject = stream;

        return new Promise<void>((resolve, reject) => {
          videoElement.onloadedmetadata = () => {
            videoElement.play()
              .then(() => {
                videoElement.width = videoElement.videoWidth;
                videoElement.height = videoElement.videoHeight;

                if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
                  console.error("[BlazePose] 비디오 크기가 0입니다");
                  reject(new Error("Invalid video dimensions"));
                  return;
                }

                console.log("[BlazePose] 카메라 설정 완료, 크기:", videoElement.width, "x", videoElement.height);
                resolve();
              })
              .catch(reject);
          };
        });
      } catch (error) {
        console.error("[BlazePose] 카메라 접근 실패:", error);
        throw error;
      }
    };

    const initializeBlazePose = async () => {
      if (poseDetectorRef.current) {
        console.log("[BlazePose] 이미 초기화됨, 재사용");
        return;
      }

      try {
        await setupCamera();

      console.log("[BlazePose] TensorFlow 초기화 시작...");
      await tf.ready();
      await tf.setBackend("webgl");
      console.log("[BlazePose] 백엔드:", tf.getBackend());

      console.log("[BlazePose] 디텍터 생성 중...");
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
          runtime: "tfjs",
          modelType: "lite",
          enableSmoothing: true,
          enableSegmentation: false,
        }
      );
      poseDetectorRef.current = detector;
      console.log("[BlazePose] 디텍터 초기화 완료");

      console.log("[HandDetection] 디텍터 생성 중...");
      const handDetector = await handPoseDetection.createDetector(
        handPoseDetection.SupportedModels.MediaPipeHands,
        {
          runtime: "tfjs",
          modelType: "full",
          maxHands: 2,
        }
      );
      handDetectorRef.current = handDetector;
      console.log("[HandDetection] 디텍터 초기화 완료");

      console.log("[FaceMesh] 디텍터 생성 중...");
      const faceDetector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: "tfjs",
          refineLandmarks: false,
          maxFaces: 1,
        }
      );
      faceDetectorRef.current = faceDetector;
      console.log("[FaceMesh] 디텍터 초기화 완료");

      let isDetecting = false;

      const detectPose = async () => {
        if (!isRunning) return;

        if (isDetecting) {
          animationFrameId = requestAnimationFrame(detectPose);
          return;
        }

        if (videoElement.readyState >= 2 && poseDetectorRef.current && handDetectorRef.current && faceDetectorRef.current && currentVrm.current) {
          isDetecting = true;
          try {
            const poses = await poseDetectorRef.current.estimatePoses(videoElement, {
              flipHorizontal: true,
            });

            if (poses.length === 0) {
              isDetecting = false;
              animationFrameId = requestAnimationFrame(detectPose);
              return;
            }

            const pose = poses[0];
            const landmarks2D = pose.keypoints;
            const getVisibility = (index: number) => landmarks2D[index]?.score || 0;

            const shouldDetectHands =
              getVisibility(15) > 0.6 || getVisibility(16) > 0.6;

            const [hands, faces] = await Promise.all([
              shouldDetectHands
                ? handDetectorRef.current.estimateHands(videoElement, {
                    flipHorizontal: true,
                  })
                : Promise.resolve([]),
              faceDetectorRef.current.estimateFaces(videoElement, {
                flipHorizontal: true,
              })
            ]);

            animateVRMWithBlazePose(currentVrm.current, pose, hands, faces);
          } catch (error) {
            console.error("[BlazePose] 감지 에러:", error);
          } finally {
            isDetecting = false;
          }
        }

        if (isRunning) {
          animationFrameId = requestAnimationFrame(detectPose);
        }
      };

        detectPose();
      } catch (error) {
        console.error("[BlazePose] 초기화 실패:", error);
      }
    };

    initializeBlazePose();

    return () => {
      console.log("[BlazePose] Cleanup 시작");
      isRunning = false;

      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }

      const stream = videoElement.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      videoElement.srcObject = null;
    };
  }, [animateVRMWithBlazePose, isCameraEnabled, selectedDevice]);



  useEffect(() => {
    if (width === 0 || height === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30.0, width / height, 0.1, 20.0);
    camera.position.set(0.0, 1.4, 1.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
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

    const urlToLoad =
      vrmUrl || "https://d1l5n2avb89axj.cloudfront.net/avatar-first.vrm";

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
          vrm.scene.rotation.y = Math.PI;
          vrm.scene.visible = isVisible;
          currentVrm.current = vrm;

          // VRM 모델의 밝기 조정
          vrm.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (Array.isArray(child.material)) {
                child.material = child.material.map((mat) => mat.clone());
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

          if (vrm.lookAt) {
            vrm.lookAt.target = new THREE.Object3D();
            vrm.scene.add(vrm.lookAt.target);
          }
        },
        undefined,
        (error) => {
          console.error("[VRM] 로드 실패:", error);
        }
      );
    }

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (currentVrm.current) {
        currentVrm.current.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (currentVrm.current) {
        VRMUtils.deepDispose(currentVrm.current.scene);
      }
      renderer.dispose();
    };
  }, [height, onCanvasReady, vrmUrl, width]);

  return <video ref={videoRef} style={{ display: "none" }}></video>;
};

export default ThreeCanvas;
