import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import {
  Screen,
  CanvasSize,
} from "@/features/canvas/constants/canvas-constants";

const API_BASE_URL = 'https://pang-ai.euns.dev';
const LOCAL_STORAGE_KEY = 'pang-3d-background-hdr-url';

type Step = 'prompt' | 'loading' | 'preview';

interface ThreeDBackgroundOptionProps {
  canvasSize: CanvasSize;
  onAddScreen: (screen: Screen) => void;
  onClose: () => void;
  sourceName: string;
}

export const ThreeDBackgroundOption: React.FC<ThreeDBackgroundOptionProps> = ({
  canvasSize,
  onAddScreen,
  onClose,
  sourceName
}) => {
  // localStorage에서 저장된 HDR URL 확인
  const savedHdrUrl = localStorage.getItem(LOCAL_STORAGE_KEY);

  const [step, setStep] = useState<Step>(savedHdrUrl ? 'preview' : 'prompt');
  const [prompt, setPrompt] = useState('');
  const [hdrUrl, setHdrUrl] = useState<string | null>(savedHdrUrl);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // API: HDR 생성 요청
  const requestHdrGeneration = async (promptText: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-hdr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        throw new Error('HDR 생성 요청에 실패했습니다.');
      }

      const data = await response.json();

      if (data.success && data.taskId) {
        setStep('loading');
        startPolling(data.taskId);
      } else {
        throw new Error(data.message || 'HDR 생성 요청에 실패했습니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // API: 상태 폴링
  const checkStatus = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/status/${id}`);

      if (!response.ok) {
        throw new Error('상태 확인에 실패했습니다.');
      }

      const data = await response.json();

      if (data.status === 'completed' && data.hdrUrl) {
        stopPolling();
        setHdrUrl(data.hdrUrl);
        // localStorage에 저장
        localStorage.setItem(LOCAL_STORAGE_KEY, data.hdrUrl);
        setStep('preview');
      } else if (data.status === 'failed' || data.error) {
        stopPolling();
        setError(data.error || 'HDR 생성에 실패했습니다.');
        setStep('prompt');
      }
      // pending 상태면 계속 폴링
    } catch (err) {
      stopPolling();
      setError(err instanceof Error ? err.message : '상태 확인 중 오류가 발생했습니다.');
      setStep('prompt');
    }
  };

  const startPolling = (id: string) => {
    pollingRef.current = setInterval(() => {
      checkStatus(id);
    }, 10000); // 10초 간격
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // 컴포넌트 언마운트 시 폴링 정리
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  // HDR 미리보기 Three.js 설정
  useEffect(() => {
    if (step !== 'preview' || !hdrUrl || !containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, 800 / 450, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(800, 450);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      hdrUrl,
      (texture: THREE.DataTexture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      },
      undefined,
      () => {
        console.error('HDR 로드 실패');
        setError('HDR 파일 로드에 실패했습니다.');
      }
    );

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const container = containerRef.current;

    return () => {
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat: THREE.Material) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
    };
  }, [step, hdrUrl]);

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
    cameraRef.current.rotation.y -= deltaX * rotationSpeed;
    cameraRef.current.rotation.x -= deltaY * rotationSpeed;
    cameraRef.current.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, cameraRef.current.rotation.x)
    );

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleSubmitPrompt = () => {
    if (!prompt.trim()) return;
    requestHdrGeneration(prompt.trim());
  };

  const handleCapture = () => {
    if (!rendererRef.current) return;

    const canvas = rendererRef.current.domElement;
    const imageUrl = canvas.toDataURL('image/png');

    const img = new Image();
    img.onload = () => {
      const newScreen: Screen = {
        id: Date.now(),
        type: "image",
        source: img,
        x: 0,
        y: 0,
        width: canvasSize.width,
        height: canvasSize.height,
        name: sourceName || "AI 3D 배경",
      };
      onAddScreen(newScreen);
      onClose();
    };
    img.src = imageUrl;
  };

  const handleRetry = () => {
    setError(null);
    setHdrUrl(null);
    // localStorage에서 제거하여 다음에 새로 생성할 수 있도록
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setStep('prompt');
  };

  // 프롬프트 입력 단계
  if (step === 'prompt') {
    return (
      <OptionContainer>
        <Description>
          AI를 활용하여 360도 3D 배경을 생성합니다. 원하는 배경을 설명해주세요.
        </Description>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Section>
          <SectionLabel>배경 설명</SectionLabel>
          <PromptTextarea
            placeholder="예: 네온 조명이 가득한 사이버펑크 스튜디오, 별이 빛나는 우주 공간, 아늑한 카페 내부..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
        </Section>

        <ButtonGroup>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton
            onClick={handleSubmitPrompt}
            disabled={!prompt.trim() || isSubmitting}
          >
            {isSubmitting ? '요청 중...' : '생성하기'}
          </ConfirmButton>
        </ButtonGroup>
      </OptionContainer>
    );
  }

  // 로딩 단계
  if (step === 'loading') {
    return (
      <OptionContainer>
        <LoadingContainer>
          <Spinner />
          <LoadingText>이미지 생성 중...</LoadingText>
          <LoadingSubText>AI가 배경을 만들고 있어요. 잠시만 기다려주세요.</LoadingSubText>
        </LoadingContainer>
      </OptionContainer>
    );
  }

  // 미리보기 단계
  return (
    <OptionContainer>
      <Description>
        마우스를 드래그하여 원하는 각도를 찾으세요.
      </Description>

      <ViewerContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <ButtonGroup>
        <CancelButton onClick={handleRetry}>다시 생성</CancelButton>
        <ConfirmButton onClick={handleCapture}>이 배경 선택</ConfirmButton>
      </ButtonGroup>
    </OptionContainer>
  );
};

// Styled Components
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.95rem;
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1rem;
  font-weight: 600;
`;

const PromptTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  font-size: 1rem;
  font-family: "Wanted Sans", sans-serif;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.subtitle};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background-color: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 8px;
  color: #ff3b30;
  font-size: 0.9rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid ${({ theme }) => theme.colors.content.dark};
  border-top-color: ${({ theme }) => theme.colors.primary.normal};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.normal};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const LoadingSubText = styled.p`
  color: ${({ theme }) => theme.colors.text.subtitle};
  font-size: 0.9rem;
  margin: 0;
`;

const ViewerContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  cursor: grab;
  border: 1px solid ${({ theme }) => theme.colors.border.normal};
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.dark};

  &:active {
    cursor: grabbing;
  }

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-family: "Wanted Sans", sans-serif;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.content.dark};
  color: ${({ theme }) => theme.colors.text.normal};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.hover.normal};
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
