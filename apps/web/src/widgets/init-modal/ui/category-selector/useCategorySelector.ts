import { useState } from "react";
import { saveUserInterests } from "./api/api";
import { toast } from "react-toastify";

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

interface UseCategorySelectorProps {
  onSuccess?: () => void;
}

export const useCategorySelector = ({ onSuccess }: UseCategorySelectorProps = {}) => {
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
      console.log("서버 응답:", data);
      
      toast.success("관심사 저장 성공");
      
      onSuccess?.();
    } catch (err) {
      console.error("관심사 저장 실패:", err);
      toast.error("관심사 저장에 실패했습니다.");
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
