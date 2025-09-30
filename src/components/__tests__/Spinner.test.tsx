import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '../ui/Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6', 'h-6', 'border-2', 'animate-spin');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Spinner size="xs" />);
    expect(screen.getByRole('status')).toHaveClass('w-3', 'h-3');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('w-8', 'h-8');

    rerender(<Spinner size="xl" />);
    expect(screen.getByRole('status')).toHaveClass('w-12', 'h-12');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Spinner color="primary" />);
    expect(screen.getByRole('status')).toHaveClass('border-gray-200', 'border-t-blue-600');

    rerender(<Spinner color="white" />);
    expect(screen.getByRole('status')).toHaveClass('border-gray-300', 'border-t-white');
  });

  it('applies custom className', () => {
    render(<Spinner className="custom-class" />);
    expect(screen.getByRole('status')).toHaveClass('custom-class');
  });

  it('has accessible label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toHaveClass('sr-only');
  });
});
