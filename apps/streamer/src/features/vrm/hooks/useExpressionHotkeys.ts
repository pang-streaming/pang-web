import { useEffect, useRef } from "react";
import { VRM } from "@pixiv/three-vrm";

interface ExpressionConfig {
  key: string;
  expressionName: string;
  displayName: string;
}

const DEFAULT_EXPRESSIONS: ExpressionConfig[] = [
  { key: "1", expressionName: "neutral", displayName: "Neutral" },
  { key: "2", expressionName: "happy", displayName: "Happy" },
  { key: "3", expressionName: "angry", displayName: "Angry" },
  { key: "4", expressionName: "sad", displayName: "Sad" },
  { key: "5", expressionName: "relaxed", displayName: "Relaxed" },
  { key: "6", expressionName: "surprised", displayName: "Surprised" },
];

const VRM_0X_MAPPING: Record<string, string> = {
  "happy": "joy",
  "sad": "sorrow",
  "relaxed": "fun",
};

export const useExpressionHotkeys = (
  vrm: VRM | null,
  enabled: boolean = true,
  customExpressions?: ExpressionConfig[]
) => {
  const currentExpressionRef = useRef<string | null>(null);
  const expressionsRef = useRef<ExpressionConfig[]>(customExpressions || DEFAULT_EXPRESSIONS);

  useEffect(() => {
    if (customExpressions) {
      expressionsRef.current = customExpressions;
    }
  }, [customExpressions]);

  const setExpression = (expressionName: string) => {
    if (!vrm?.expressionManager) return;

    const manager = vrm.expressionManager;
    const availableExpressions = Object.keys(manager.expressionMap);

    let targetExpression = expressionName.toLowerCase();

    if (!availableExpressions.includes(targetExpression)) {
      const mapped = VRM_0X_MAPPING[targetExpression];
      if (mapped && availableExpressions.includes(mapped)) {
        targetExpression = mapped;
      } else {
        const match = availableExpressions.find(name =>
          name.toLowerCase().includes(targetExpression)
        );
        if (match) {
          targetExpression = match;
        } else {
          console.warn(`Expression "${expressionName}" not found in VRM model`);
          return;
        }
      }
    }

    if (currentExpressionRef.current) {
      manager.setValue(currentExpressionRef.current, 0);
    }

    manager.setValue(targetExpression, 1.0);
    currentExpressionRef.current = targetExpression;

    console.log(`🎭 Expression changed to: ${targetExpression}`);
  };

  const resetExpression = () => {
    if (!vrm?.expressionManager || !currentExpressionRef.current) return;

    vrm.expressionManager.setValue(currentExpressionRef.current, 0);
    currentExpressionRef.current = null;

    console.log("🎭 Expression reset to neutral");
  };

  useEffect(() => {
    if (!enabled || !vrm) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;

      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const config = expressionsRef.current.find(exp => exp.key === event.key);

      if (config) {
        event.preventDefault();
        setExpression(config.expressionName);
      }

      if (event.key === "0") {
        event.preventDefault();
        resetExpression();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [vrm, enabled]);

  return {
    setExpression,
    resetExpression,
    currentExpression: currentExpressionRef.current,
  };
};

export const getAvailableExpressions = (vrm: VRM | null): string[] => {
  if (!vrm?.expressionManager) return [];
  return Object.keys(vrm.expressionManager.expressionMap);
};
