import {ReactNode} from "react";
import {PiBroadcastBold} from "react-icons/pi";
import Bomb from "../../asset/icons/bomb.svg?react";
import Category from "../../asset/icons/category.svg?react";
import Heart from "../../asset/icons/heart.svg?react";
import Budget from "../../asset/icons/budget.svg?react";
import {IoSearch, IoStorefrontOutline} from "react-icons/io5";
import {FaTowerBroadcast} from "react-icons/fa6";
import {MdDashboard, MdOutlinePermMedia} from "react-icons/md";

export interface SidebarItem {
	id: string;
	icon: ReactNode;
	name: string;
	path: string;
}

export const userSidebarItems: SidebarItem[] = [
	{
		id: 'explore',
		icon: <PiBroadcastBold size={28}/>,
		name: '스트리머',
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
		id: "store",
		name: "상점",
		path: "/store",
		icon: <IoStorefrontOutline size={28} />,
	},
]

export const streamerSidebarItems: SidebarItem[] = [
	{
		id: 'dashboard',
		icon: <MdDashboard size={26}/>,
		name: '대시보드',
		path: '/dashboard'
	},
	{
		id: "streaming",
		icon: <FaTowerBroadcast size={26} />,
		name: "스트리밍 관리",
		path: "/streaming",
	},
	{
		id: "revenue",
		name: "수익관리",
		path: "/revenue",
		icon: <Budget/>,
	},
	{
		id: "content",
		name: "콘텐츠 관리",
		path: "/content",
		icon: <MdOutlinePermMedia size={26} />,
	}
]