import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

interface ThreeDBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBackground: (imageUrl: string) => void;
}

export const ThreeDBackgroundModal: React.FC<ThreeDBackgroundModalProps> = ({
  isOpen,
  onClose,
  onSelectBackground
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    setIsLoading(true);

    // Scene 설정
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      800 / 600,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(800, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 360도 Sphere 생성 (성능 최적화를 위해 폴리곤 수 감소)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // 내부에서 보이도록 반전

    // Neon Photostudio HDRI 로드
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      '/textures/neon-photostudio.hdr',
      (texture) => {
        console.log('Neon Photostudio HDRI 로드 완료');
        texture.mapping = THREE.EquirectangularReflectionMapping;

        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('HDRI 로드 실패:', error);
        setIsLoading(false);
      }
    );

    // 애니메이션 루프
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 클린업
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
    };
  }, [isOpen]);

  // 마우스 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !cameraRef.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    const rotationSpeed = 0.005;

    // 카메라 회전
    cameraRef.current.rotation.y -= deltaX * rotationSpeed;
    cameraRef.current.rotation.x -= deltaY * rotationSpeed;

    // 상하 회전 제한 (90도)
    cameraRef.current.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, cameraRef.current.rotation.x)
    );

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleCapture = () => {
    if (!rendererRef.current) return;

    // 현재 뷰를 이미지로 캡처
    const canvas = rendererRef.current.domElement;
    const imageUrl = canvas.toDataURL('image/png');

    onSelectBackground(imageUrl);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose} $isClosing={isClosing}>
      <ModalContent onClick={(e) => e.stopPropagation()} $isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>3D 배경 선택</ModalTitle>
          <CloseButton onClick={handleClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <InfoText>마우스를 드래그하여 원하는 각도를 찾으세요</InfoText>
          <ViewerContainer
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {isLoading && (
              <LoadingOverlay>
                <LoadingText>3D 배경 로딩 중...</LoadingText>
              </LoadingOverlay>
            )}
          </ViewerContainer>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={handleClose}>취소</CancelButton>
          <SelectButton onClick={handleCapture}>이 배경 선택</SelectButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.colors.background.dark}CC`};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div<{ $isClosing?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background.normal};
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.normal};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.light};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-align: center;
`;

const ViewerContainer = styled.div`
  width: 800px;
  height: 600px;
  border-radius: 12px;
  overflow: hidden;
  cursor: grab;
  border: 2px solid ${({ theme }) => theme.colors.border.normal};
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.dark};

  &:active {
    cursor: grabbing;
  }

  canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    z-index: 1;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 16px;
  font-weight: 500;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.normal};
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borders.small};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  background-color: ${({ theme }) => theme.colors.background.normal};
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const SelectButton = styled.button`
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.borders.small};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
