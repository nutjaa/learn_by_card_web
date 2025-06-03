// src/components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string | Error;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600 mb-2">Error: {message.toString()}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
