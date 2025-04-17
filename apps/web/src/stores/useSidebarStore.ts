import {create} from 'zustand';


interface SidebarStore {
    selected: string
    setSelected: (select: string) => void
    isClipped: boolean
    setIsClipped: (isClipped: boolean) => void
    
}
  
const useSidebarStore = create<SidebarStore>((set) => ({
    selected: "explorer",
    setSelected: (value:string) => set({ selected: value }),
  
    isClipped: false,
    setIsClipped: (value:boolean) => set({ isClipped: value }),
}));

export default useSidebarStore;