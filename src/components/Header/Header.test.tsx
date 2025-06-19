/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  const mockOnAddTodo = vi.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  it('should render the title', () => {
    render(<Header onAddTodo={mockOnAddTodo} />);
    expect(screen.getByText('todos')).toBeInTheDocument();
  });

  it('should render input field with placeholder', () => {
    render(<Header onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toBeInTheDocument();
  });

  it('should call onAddTodo when Enter is pressed', () => {
    render(<Header onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo');
  });

  it('should clear input after adding todo', () => {
    render(<Header onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(input.value).toBe('');
  });

  it('should not call onAddTodo for empty input', () => {
    render(<Header onAddTodo={mockOnAddTodo} />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
}); 