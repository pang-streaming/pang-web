import styled from "styled-components";
import { useCategorySelector } from "./useCategorySelector";

const categories = [
  "게임",
  "여행",
  "먹방",
  "버츄얼",
  "스포츠",
  "음악",
  "그림",
  "토크",
  "요리",
  "시사 경제",
  "스터디",
];

interface CategorySelectorProps {
  onSuccess?: () => void;
}

export const CategorySelector = ({ onSuccess }: CategorySelectorProps) => {
  const { selectedCategories, toggleCategory, submitCategories, loading } = useCategorySelector({ onSuccess });

  return (
    <Container>
      <Grid>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => toggleCategory(category)}
            selected={selectedCategories.includes(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </Grid>

      <SubmitButton onClick={submitCategories} disabled={loading}>
        {loading ? "저장 중..." : "선택 완료"}
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 50px 0 70px 0;
`;

const CategoryButton = styled.button<{ selected: boolean }>`
  padding: 7px 21px;
  border-radius: 50px;
  border: 1px solid ${({ selected }) => (selected ? "#FF0055" : "#A3A3A3")};
  background-color: transparent;
  color: ${({ selected }) => (selected ? "#FF0055" : "#A3A3A3")};
  font-weight: 600;
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const SubmitButton = styled.button`
  margin-top: auto;

  width: 100%;
  height: 53px;
  background: ${({ theme }) => theme.colors.primary.normal};
  border: none;
  outline: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  transition: opacity 0.2s ease;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
