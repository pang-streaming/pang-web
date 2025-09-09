import {ReactNode} from "react";
import {PiBroadcastBold} from "react-icons/pi";
import Bomb from "../../asset/icons/bomb.svg?react";
import Category from "../../asset/icons/category.svg?react";
import Heart from "../../asset/icons/heart.svg?react";
import {IoSearch} from "react-icons/io5";

interface SidebarItem {
	id: string;
	icon: ReactNode;
	name: string;
	path: string;
}

export const SidebarItems: SidebarItem[] = [
	{
		id: 'explore',
		icon: <PiBroadcastBold size={28}/>,
		name: '탐색',
		path: '/explore'
	},
	{
		id: "category",
		icon: <Category/>,
		name: "카테고리",
		path: "/category",
	},
	{
		id: "follow",
		name: "팔로잉",
		path: "/follow",
		icon: <Heart/>,
	},
	{
		id: "cash",
		name: "충전",
		path: "/cash",
		icon: <Bomb width={28} height={28}/>,
	},
	{
		id: "search",
		name: "검색",
		path: "/search",
		icon: <IoSearch size={28}/>,
	},
]