import { useState } from "react";
import { saveUserInterests } from "./api/api";

const categoryMap: Record<string, string> = {
  게임: "GAME",
  여행: "TRAVEL",
  먹방: "EATING_SHOW",
  버츄얼: "VIRTUAL",
  스포츠: "SPORTS",
  음악: "MUSIC",
  그림: "DRAWING",
  토크: "TALK",
  요리: "COOKING",
  "시사 경제": "CURRENT_AFFAIRS",
  스터디: "STUDY",
};

export const useCategorySelector = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const submitCategories = async () => {
    try {
      setLoading(true);
      const mapped = selectedCategories.map((c) => categoryMap[c]);
      const data = await saveUserInterests(mapped);
      alert("관심사 저장 완료");
      console.log("서버 응답:", data);
    } catch (err) {
      console.error("관심사 저장 실패:", err);
      alert("서버 요청 실패");
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedCategories,
    toggleCategory,
    submitCategories,
    loading,
  };
};
