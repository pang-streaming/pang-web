
import { useState } from "react";
import styled from "styled-components";

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

export const CategorySelector = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: auto;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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
  outline: none;
`;
