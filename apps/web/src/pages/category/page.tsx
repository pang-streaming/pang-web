

import { CategoryBox } from "./ui/category-box";
import styled from "styled-components";
import { TabTitleText } from "@/shared/ui/tab-title-text";
import { Tag, TagButton } from "@pang/shared/ui";
import { useCategory } from "./hook/useCategory";
import { ErrorScreen } from "@/shared/ui/error-screen";
import { CategorySkeleton } from "@/shared/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Category as CategoryType } from "./model/category";


const tags: Tag[] = [
  { id: "all", name: "전체" },
  { id: "virtual", name: "버츄얼" },
  { id: "game", name: "게임" },
  { id: "sports", name: "스포츠" },
  { id: "etc", name: "기타" },
];




export const Category = () => {
	const { data, isLoading, isError, error } = useCategory();
	const navigate = useNavigate();
	
	// Ensure categories is always an array
	const categories = Array.isArray(data) ? data : [];
  
	if (isLoading) {
	  return (
		<CategoryContainer>
		  <TabTitleText>카테고리</TabTitleText>
		  {/* <TagHeader>
			<TagButton tags={tags} defaultTagId="all" />
		  </TagHeader> */}
		  <CategorySkeleton />
		</CategoryContainer>
	  );
	}
  
	if (isError) return <ErrorScreen error={String(error)}/>
  
	const handleCategoryClick = (category: CategoryType) => {
		navigate(`/category/${category.id}`, { state: { category } });
	};
  
	return (
	  <CategoryContainer>
		<TabTitleText>카테고리</TabTitleText>
		{/* <TagHeader>
		  <TagButton tags={tags} defaultTagId="all" />
		</TagHeader> */}
		<CategoryWrapper>
			
		  {categories.map((category) => (
			<div key={category.id} onClick={() => handleCategoryClick(category)}>
			  <CategoryBox category={category} />
			</div>
		  ))}
		</CategoryWrapper>
	  </CategoryContainer>
	);
  };

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TagHeader = styled.div`
  box-sizing: border-box;
  padding: 14px 2px;
  position: sticky;
  top: 67px;
  background-color: ${({ theme }) => theme.colors.background.normal};
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);

  @media (min-width: 800px) { grid-template-columns: repeat(4, 1fr); }
  @media (min-width: 1200px) { grid-template-columns: repeat(5, 1fr); }
  @media (min-width: 1600px) { grid-template-columns: repeat(6, 1fr); }
  @media (min-width: 1900px) { grid-template-columns: repeat(7, 1fr); }
  @media (min-width: 2090px) { grid-template-columns: repeat(8, 1fr); }
`;
