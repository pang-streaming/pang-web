import styled from "styled-components";
import {useTag} from "./model/useTag";

export interface Tag {
	id: string;
	name: string;
}

interface TagButtonProps {
	tags: Tag[];
	defaultTagId?: string | null;
	onChanged?: (activeTagId: string | null) => void;
}

export const TagButton = ({tags, defaultTagId = null, onChanged}: TagButtonProps) => {
	const { handleTagClick, isActive } = useTag({ defaultTagId, onChanged });
	return (
		<CommunityTagList>
			{
				tags.map((tag) => (
					<CommunityTag id={tag.id} onClick={() => handleTagClick(tag.id)} selected={isActive(tag.id)}>{tag.name}</CommunityTag>
				))
			}
		</CommunityTagList>
	)
}

const CommunityTagList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const CommunityTag = styled.span<{selected?: boolean}>`
	border-radius: ${({theme}) => theme.borders.maximum};
	padding: 4px 10px;
	color: ${({theme, selected}) => selected ? theme.colors.background.dark : theme.colors.text.subtitle};
	border: 2px solid ${({theme, selected}) => selected ? theme.colors.text.normal : theme.colors.text.subtitle};
	background-color: ${({theme, selected}) => selected ? theme.colors.text.normal : 'none'};
	cursor: pointer;
	font-size: ${({theme}) => theme.font.medium};
	font-weight: 700;
	user-select: none;
	&:hover {
			background-color: ${({theme, selected}) => selected ? theme.colors.text.normal : theme.colors.hover.light};
	}
`