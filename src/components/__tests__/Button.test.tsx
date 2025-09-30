import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button />);
    const button = screen.getByText('VIEW ALL');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-blue-600', 'rounded-full');
  });

  it('renders with custom text', () => {
    render(<Button text="Custom Text" />);
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('VIEW ALL'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm" />);
    expect(screen.getByText('VIEW ALL')).toHaveClass('text-xs', 'px-3', 'py-1.5');

    rerender(<Button size="lg" />);
    expect(screen.getByText('VIEW ALL')).toHaveClass('text-sm', 'px-6', 'py-3');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class" />);
    expect(screen.getByText('VIEW ALL')).toHaveClass('custom-class');
  });

  it('has hover styles', () => {
    render(<Button />);
    expect(screen.getByText('VIEW ALL')).toHaveClass('hover:text-blue-700', 'transition-colors');
  });
});
