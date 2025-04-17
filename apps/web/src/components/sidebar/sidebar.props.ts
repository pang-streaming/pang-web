import { ReactNode } from "react";

export interface SidebarExplorerItem {
    id: string;
    icon: ReactNode;
    isClipped?: boolean;
    label: string;
    to: string
}

export interface SidebarProps {
    isClipped:boolean
}

export interface SidebarItemProps {
    isSelected: boolean;
}