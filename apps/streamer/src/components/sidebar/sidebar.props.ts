import { ReactNode } from "react";

export interface SidebarProps {
    $isClipped: boolean;
}

export interface SidebarExplorerItem {
    id: string;
    icon: ReactNode;
    label: string;
    $isClipped: boolean;
    to?: string;
}
