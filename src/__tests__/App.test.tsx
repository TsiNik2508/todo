import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('ToDo App', () => {
  
  test('добавление новой задачи', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  test('переключение состояния задачи (выполнена/не выполнена)', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Complete' } });
    fireEvent.click(addButton);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    const taskText = screen.getByText(/Task to Complete/i);
    expect(taskText).toHaveClass('todoItem__textCompleted');
  });

  test('редактирование задачи', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'Editable Task' } });
    fireEvent.click(addButton);
    
    const taskText = screen.getByText(/Editable Task/i);
    fireEvent.doubleClick(taskText);
    
    const editInput = screen.getByDisplayValue(/Editable Task/i);
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });
    fireEvent.blur(editInput);
    
    expect(screen.getByText(/Edited Task/i)).toBeInTheDocument();
  });

  test('удаление завершенных задач', () => {
    render(<App />);
    
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    const deleteCompletedButton = screen.getByText(/Delete Completed/i);
    fireEvent.click(deleteCompletedButton);
    
    expect(screen.queryByText(/Task to Delete/i)).not.toBeInTheDocument();
  });
});
