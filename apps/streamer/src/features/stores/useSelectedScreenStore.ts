import {create} from "zustand/react";

interface SelectedScreenStore {
	selectedScreen: number | null;
	setSelectedScreen: (newValue: number | null) => void;
}

export const useSelectedScreenStore = create<SelectedScreenStore>((set) => ({
	selectedScreen: null,
	setSelectedScreen: (newValue) => set({ selectedScreen: newValue }),
}));