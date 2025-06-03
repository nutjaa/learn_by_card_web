import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const store = useAuthStore();

  // Check authentication status on mount
  useEffect(() => {
    if (store.token && !store.isAuthenticated) {
      store.checkAuth();
    }
  }, [store, store.token, store.isAuthenticated, store.checkAuth]);

  return store;
}

// Hook for protecting routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    canAccess: isAuthenticated && !isLoading,
  };
}
