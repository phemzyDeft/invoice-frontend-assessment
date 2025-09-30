import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from '../Loader';

describe('Loader', () => {
  it('renders with default props', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<Loader message="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Loader size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('w-4', 'h-4');

    rerender(<Loader size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('w-8', 'h-8');
  });

  it('renders with different colors', () => {
    const { rerender } = render(<Loader color="primary" />);
    expect(screen.getByRole('status')).toHaveClass('border-t-blue-600');

    rerender(<Loader color="white" />);
    expect(screen.getByRole('status')).toHaveClass('border-t-white');
  });

  it('applies custom className', () => {
    render(<Loader className="custom-class" />);
    expect(screen.getByRole('status').parentElement).toHaveClass('custom-class');
  });

  it('has proper structure', () => {
    render(<Loader message="Test message" />);
    const container = screen.getByRole('status').parentElement;
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    
    const message = screen.getByText('Test message');
    expect(message).toHaveClass('text-sm', 'text-gray-600');
  });
});
