export interface ExpressionConfig {
  key: string;
  expressionName: string;
  displayName: string;
}

export const DEFAULT_EXPRESSIONS: ExpressionConfig[] = [
  { key: "1", expressionName: "neutral", displayName: "Neutral" },
  { key: "2", expressionName: "happy", displayName: "Happy" },
  { key: "3", expressionName: "angry", displayName: "Angry" },
  { key: "4", expressionName: "sad", displayName: "Sad" },
  { key: "5", expressionName: "relaxed", displayName: "Relaxed" },
  { key: "6", expressionName: "surprised", displayName: "Surprised" },
];

export const VRM_0X_MAPPING: Record<string, string> = {
  "happy": "joy",
  "sad": "sorrow",
  "relaxed": "fun",
};
