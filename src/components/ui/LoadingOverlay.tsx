import React from 'react';
import Spinner from './Spinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = 'Loading...', 
  size = 'md',
  className = ''
}) => {
  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${className}`}>
      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center space-y-4">
        <Spinner size={size} />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
