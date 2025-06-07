import { create } from 'zustand';

interface LanguageState {
  isLoading: boolean;
  error: string | null;
}

interface LanguageActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type LanguageStore = LanguageState & LanguageActions;

const initialState: LanguageState = {
  isLoading: false,
  error: null,
};

export const useLanguageStore = create<LanguageStore>()((set) => ({
  ...initialState,

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
