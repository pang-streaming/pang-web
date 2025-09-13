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