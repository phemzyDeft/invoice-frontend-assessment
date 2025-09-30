import React from 'react';

/**
 * Spinner component props interface
 */
interface SpinnerProps {
  /** Size variant of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Color theme of the spinner */
  color?: 'primary' | 'secondary' | 'white';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Spinner Component
 * 
 * A reusable loading spinner with multiple size and color variants.
 * Provides consistent loading indicators across the application.
 * 
 * Features:
 * - 5 size variants (xs, sm, md, lg, xl)
 * - 3 color themes (primary, secondary, white)
 * - Accessible with proper ARIA labels
 * - Smooth CSS animations
 * 
 * @param {SpinnerProps} props - Component props
 * @returns {JSX.Element} Spinner component
 */
const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-gray-200 border-t-blue-600',
    secondary: 'border-gray-200 border-t-gray-600',
    white: 'border-gray-300 border-t-white'
  };

  return (
    <div 
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
