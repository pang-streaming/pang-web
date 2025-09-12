import React from "react";
import { CategoryBox } from "./ui/category-box";
import styled from "styled-components";
import {TabTitleText} from "@/shared/ui/tab-title-text";

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
			<TabTitleText>카테고리</TabTitleText>
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


const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 30px;
    align-content: flex-start;
`;