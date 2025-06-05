import { useQuery } from '@tanstack/react-query';
import { serviceProvider } from '@/services';
import { LanguagesResponse } from '@/services/api/interfaces';

// Query keys
export const languagesQueryKeys = {
  all: ['languages'] as const,
  lists: () => [...languagesQueryKeys.all, 'list'] as const,
};

// Fetch all languages
export function useLanguages() {
  return useQuery<LanguagesResponse, Error>({
    queryKey: languagesQueryKeys.lists(),
    queryFn: () => serviceProvider.languagesApi.fetchLanguages(),
    staleTime: 1000 * 60 * 15, // 15 minutes - languages don't change often
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Helper hook to get languages as a simple array
export function useLanguagesList() {
  const { data, ...rest } = useLanguages();

  return {
    ...rest,
    languages: data?.member || [],
  };
}
