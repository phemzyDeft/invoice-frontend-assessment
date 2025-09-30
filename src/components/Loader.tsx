import React from 'react';
import Spinner from './ui/Spinner';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  message
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Spinner size={size} color={color} />
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default Loader;
