'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ClientRedirectProps {
  to: string;
  delay?: number;
  showMessage?: boolean;
  message?: string;
}

export function ClientRedirect({
  to,
  delay = 100,
  showMessage = true,
  message = 'Redirecting...',
}: ClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(to);
    }, delay);

    return () => clearTimeout(timer);
  }, [to, router, delay]);

  if (!showMessage) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}
