import { Fragment } from "react";
import { IoHeartOutline, IoRadioOutline } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { PiList } from "react-icons/pi";
import useSidebarStore from "../../stores/useSidebarStore";
import logo from "../../assets/logo.svg"
import pung from "../../assets/pung.png"
import pung_primary from "../../assets/pung-primary.png"
import pung_gray from "../../assets/pung-gray.png"

import { ItemIconAndTextCliped, ItemIconAndText, SidebarContainer, BaseSidebar, HeaderLogoContainer } from "./sidebar.style"
import { SidebarExplorerItem, SidebarProps } from "./sidebar.props";
import { Link } from 'react-router-dom';

export const SidebarItem = ({ id, icon, label, isClipped, to }: SidebarExplorerItem) => {
    const { setSelected, selected } = useSidebarStore();
    const isSelected = (selected == id)

    let displayLabel = label.replace(" ", "\n");
    if (isClipped) {
        return <Fragment>
            <Link to={to} style={{textDecoration:"none"}}>
                <ItemIconAndTextCliped isSelected={isSelected} onClick={() => setSelected(id)}>
                    {icon}
                    <div>
                        {displayLabel}
                    </div>
                </ItemIconAndTextCliped>
            </Link>
        </Fragment>
    }else{
        return <Link to={to} style={{textDecoration:"none"}}>
            <ItemIconAndText isSelected={isSelected} onClick={() => setSelected(id)}>
                {icon} {label.replace(" ", "")}
            </ItemIconAndText>
        </Link>
    };
}





export const SidebarMainNav = ({isClipped}:SidebarProps) =>{
    const { selected } = useSidebarStore();
    const SidebarList = [
        {
            id: "explorer",
            label: '탐색',
            to: "/",
            icon:(
                <IoRadioOutline size={24}/>
            )
        },
        {
            id: "category",
            label: '카테 고리',
            to: "/category",
            icon:(
                <IoGridOutline  size={24}/>
            )
        },
        {
            id: "follow",
            label: '팔로잉',
            to: "/follow",
            icon:(
                <IoHeartOutline size={24}/>
            )
        },
        {
            id: "pung",
            label: '충전',
            to: "/pung",
            icon:(
                <img src={ selected == "pung" ? pung_primary : !isClipped ? pung : pung_gray} width={24}></img>
            )
        },
    ]

    return (
        <SidebarContainer>
            { 
                SidebarList.map(element => (
                    <SidebarItem id={element.id} to={element.to} label={element.label} icon={element.icon} isClipped={isClipped}/>
                ))
            }   
            
        </SidebarContainer>
    )
}

export const Sidebar = () => {
    const { isClipped, setIsClipped } = useSidebarStore();
    return (
        <BaseSidebar>
            <HeaderLogoContainer>
                <PiList onClick={()=>{setIsClipped(!isClipped)}} style={{marginLeft:28}} size={24}/>
                <img 
                    width={130} 
                    src={logo} 

                    alt='Pang-Logo'
                />
            </HeaderLogoContainer>
            <SidebarMainNav isClipped={isClipped}/>
        </BaseSidebar>
    )
}