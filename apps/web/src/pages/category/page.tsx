import React from "react";
import { CategoryBox } from "./ui/category-box";
import styled from "styled-components";
import {TabTitleText} from "@/shared/ui/tab-title-text";
import {Tag, TagButton} from "@pang/shared/ui";

interface CategoryItem {
	categoryTitle: string;
	categoryChipCount: number;
	categoryLiveCount: number;
}

// const categories: CategoryItem[] = [
// 	{ categoryTitle: "게임", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "음악", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "스포츠", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "일상", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "ASMR", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "게임", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "음악", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "스포츠", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "일상", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "ASMR", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "게임", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "음악", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "스포츠", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "일상", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "ASMR", categoryChipCount: 126315, categoryLiveCount: 201 },
// 	{ categoryTitle: "버추얼", categoryChipCount: 126315, categoryLiveCount: 201 },
// ];
import { categories } from "./model/category";

const tags: Tag[] = [
	{
		id: 'all',
		name: '전체'
	},
	{
		id: 'virtual',
		name: '버츄얼'
	},
	{
		id: 'game',
		name: '게임'
	},
	{
		id: 'sports',
		name: '스포츠'
	},
	{
		id: 'etc',
		name: '기타'
	},
]

export const Category = () => {
	return (
		<CategoryContainer>
			<TabTitleText>카테고리</TabTitleText>
			<TagHeader>
				<TagButton tags={tags} defaultTagId='all'/>
			</TagHeader>
			<CategoryWrapper>
				{categories.map((category, index) => (
					<CategoryBox
						key={category.id}
						categoryChipCount={category.categoryChipCount}
						categoryLiveCount={category.categoryLiveCount}
						categoryTitle={category.categoryTitle}
						categoryThumbnail={category.categoryThumbnail}
					/>
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
  background-color: ${({theme}) => theme.colors.background.normal};
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

    @media (min-width: 800px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: 1600px) {
        grid-template-columns: repeat(6, 1fr);
    }

    @media (min-width: 1900px) {
        grid-template-columns: repeat(7, 1fr);
    }

    @media (min-width: 2090px) {
        grid-template-columns: repeat(8, 1fr);
    }
`;