import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/types/language';

interface LanguageState {
  selectedLanguage: Language | null;
  isLoading: boolean;
  error: string | null;
}

interface LanguageActions {
  setSelectedLanguage: (language: Language) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type LanguageStore = LanguageState & LanguageActions;

const initialState: LanguageState = {
  selectedLanguage: null,
  isLoading: false,
  error: null,
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSelectedLanguage: (language: Language) => {
        set({ selectedLanguage: language, error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
    }
  )
);
