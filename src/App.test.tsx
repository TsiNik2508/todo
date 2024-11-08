import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('ToDo App', () => {
  
  // Тест на добавление новой задачи
  test('добавление новой задачи', () => {
    render(<App />);
    
    // Найти поле ввода и кнопку добавления
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    
    // Ввести текст задачи и нажать "Add"
    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);
    
    // Проверить, что задача появилась в списке
    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  // Тест на переключение состояния задачи (выполнена/не выполнена)
  test('переключение состояния задачи (выполнена/не выполнена)', () => {
    render(<App />);
    
    // Добавить задачу
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Complete' } });
    fireEvent.click(addButton);
    
    // Найти чекбокс и кликнуть на него
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Проверить, что задача стала выполненной (через класс `todoItem__textCompleted`)
    const taskText = screen.getByText(/Task to Complete/i);
    expect(taskText).toHaveClass('todoItem__textCompleted');
  });

  // Тест на редактирование задачи
  test('редактирование задачи', () => {
    render(<App />);
    
    // Добавить задачу
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'Editable Task' } });
    fireEvent.click(addButton);
    
    // Двойной клик по задаче для активации редактирования
    const taskText = screen.getByText(/Editable Task/i);
    fireEvent.doubleClick(taskText);
    
    // Изменить текст задачи
    const editInput = screen.getByDisplayValue(/Editable Task/i);
    fireEvent.change(editInput, { target: { value: 'Edited Task' } });
    fireEvent.blur(editInput);
    
    // Проверить, что текст задачи обновился
    expect(screen.getByText(/Edited Task/i)).toBeInTheDocument();
  });

  // Тест на удаление завершенных задач
  test('удаление завершенных задач', () => {
    render(<App />);
    
    // Добавить и завершить задачу
    const inputElement = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add/i);
    fireEvent.change(inputElement, { target: { value: 'Task to Delete' } });
    fireEvent.click(addButton);
    
    // Отметить задачу как выполненную
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Нажать на кнопку удаления завершенных задач
    const deleteCompletedButton = screen.getByText(/Delete Completed/i);
    fireEvent.click(deleteCompletedButton);
    
    // Проверить, что задача была удалена
    expect(screen.queryByText(/Task to Delete/i)).not.toBeInTheDocument();
  });
});
