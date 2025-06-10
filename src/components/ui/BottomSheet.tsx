'use client';

import { useEffect } from 'react';
import { Portal } from './Portal';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showHandle?: boolean;
  maxHeight?: string;
  className?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  maxHeight = '70vh',
  className = '',
}: BottomSheetProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when bottom sheet is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-end">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />

        {/* Bottom Sheet */}
        <div
          className={`relative w-full bg-white dark:bg-gray-900 rounded-t-2xl shadow-xl overflow-hidden transform transition-transform duration-300 ease-out ${className}`}
          style={{ maxHeight }}
        >
          {/* Handle */}
          {showHandle && (
            <div className="flex justify-center py-3">
              <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
          )}

          {/* Header */}
          {title && (
            <div className="px-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            </div>
          )}

          {/* Content */}
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: `calc(${maxHeight} - ${title ? '5rem' : '3rem'})`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}