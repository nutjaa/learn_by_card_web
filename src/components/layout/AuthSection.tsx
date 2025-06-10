'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoginIcon, LogoutIcon, UserPlusIcon } from '../ui/icons/AuthIcons';

interface AuthSectionProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

export function AuthSection({
  isMobile = false,
  onMobileMenuClose,
}: AuthSectionProps) {
  const { isAuthenticated, user, logout } = useAuth();

  if (isMobile) {
    return (
      <div className="px-3 py-2 space-y-2">
        {isAuthenticated ? (
          <>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Welcome, {user?.name || 'User'}
            </p>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LogoutIcon className="w-4 h-4 mr-2" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={onMobileMenuClose}
            >
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Register
            </Link>
            <Link
              href="/login"
              className="w-full flex items-center justify-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={onMobileMenuClose}
            >
              <LoginIcon className="w-4 h-4 mr-2" />
              Login
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Welcome, {user?.name || 'User'}
          </span>
          <button
            onClick={logout}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <LogoutIcon className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link
            href="/register"
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Register
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <LoginIcon className="w-4 h-4 mr-2" />
            Login
          </Link>
        </>
      )}
    </div>
  );
}