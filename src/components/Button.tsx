import React from 'react';

/**
 * Button component props interface
 */
interface ButtonProps {
  /** Click handler function */
  onClick?: () => void;
  /** Button text content */
  text?: string;
  /** Additional CSS classes */
  className?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Button Component
 * 
 * A flexible button component with multiple size variants and customizable styling.
 * Designed for consistent UI across the application.
 * 
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} Button component
 */
const Button: React.FC<ButtonProps> = ({
  onClick,
  text = "VIEW ALL",
  className = "",
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-xs px-4 py-2',
    lg: 'text-sm px-6 py-3'
  };

  return (
    <button 
      onClick={onClick}
      className={`text-blue-600 hover:text-blue-700 font-semibold tracking-widest border border-gray-200 rounded-full transition-colors ${sizeClasses[size]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
