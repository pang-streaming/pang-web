import {create} from "zustand";
import {persist} from "zustand/middleware";

type ThemeMode = 'light' | 'dark';

interface ThemeState {
	mode: ThemeMode;
	toggleTheme: () => void;
	setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			mode: 'dark',
			toggleTheme: () => set((state) => ({
				mode: state.mode === 'dark' ? 'light' : 'dark'
			})),
			setTheme: (theme) => set({ mode: theme }),
		}),
		{
			name: 'theme-storage',
		}
	)
);
