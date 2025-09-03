
import React from 'react';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Thinking...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-lg">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-green"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
      <p className="text-sm text-gray-500">Please wait while we process your request.</p>
    </div>
  );
};

export default LoadingSpinner;
