import React from "react";
import { CategoryBox } from "./ui/category-box";
import styled from "styled-components";
import {IoSearch} from "react-icons/io5";

interface CategoryItem {
	categoryTitle: string;
	categoryChipCount: number;
	categoryLiveCount: number;
}

const categories: CategoryItem[] = [
	{ categoryTitle: "게임", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "음악", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "스포츠", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "일상", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "ASMR", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "버추얼", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "게임", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "음악", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "스포츠", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "일상", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "ASMR", categoryChipCount: 126315, categoryLiveCount: 201 },
	{ categoryTitle: "버추얼", categoryChipCount: 126315, categoryLiveCount: 201 },
];

export const Category = () => {
	return (
		<CategoryWrapper>
			<CategoryHeader>
				<CategoryTitle>카테고리</CategoryTitle>
			</CategoryHeader>
			<CategoryContainer>
				{categories.map((category, index) => (
					<CategoryBox
						key={index}
						categoryChipCount={category.categoryChipCount}
						categoryLiveCount={category.categoryLiveCount}
						categoryTitle={category.categoryTitle}
					/>
				))}
			</CategoryContainer>
		</CategoryWrapper>
	);
};

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
	justify-content: start;
    color: ${({theme}) => theme.colors.text.normal};
    gap: 2px;
`;

const CategoryTitle = styled.span`
	color: ${({theme}) => theme.colors.text.normal};
	font-size: ${({theme}) => theme.font.xxLarge};
	font-weight: 600;
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 30px;
    align-content: flex-start;
`;