import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('App Component', () => {
  test('рендерится без ошибок', () => {
    render(<App />);
    expect(screen.getByText('todos')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
  });

  test('добавляет новую задачу при нажатии Enter', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Новая задача');
    await user.keyboard('{Enter}');
    expect(screen.getByText('Новая задача')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('не добавляет пустую задачу', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.keyboard('{Enter}');
    const todoItems = screen.queryAllByRole('listitem');
    expect(todoItems).toHaveLength(0);
  });

  test('отмечает задачу как выполненную и обновляет счетчик', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Тестовая задача');
    await user.keyboard('{Enter}');
    const todoText = screen.getByText('Тестовая задача');
    const checkbox = screen.getByRole('button', { name: /mark as complete/i });
    // Изначально не выполнена
    expect(todoText).not.toHaveClass('completed');
    expect(screen.getByText(/1\s*item\s*left/i)).toBeInTheDocument();
    // Кликаем на чекбокс для выполнения
    await user.click(checkbox);
    // Должна быть выполнена
    expect(todoText.className).toMatch(/completed/);
    const counter = document.querySelector('._count_acfd2c');
    expect(counter?.textContent.replace(/\s+/g, '')).toContain('0itemsleft');
  });

  test('удаляет задачу при клике на кнопку удаления', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Задача для удаления');
    await user.keyboard('{Enter}');
    expect(screen.getByText('Задача для удаления')).toBeInTheDocument();
    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    await user.click(deleteButton);
    expect(screen.queryByText('Задача для удаления')).not.toBeInTheDocument();
  });

  test('фильтрует задачи корректно', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Задача 1');
    await user.keyboard('{Enter}');
    await user.type(input, 'Задача 2');
    await user.keyboard('{Enter}');
    await user.type(input, 'Задача 3');
    await user.keyboard('{Enter}');
    // Выполняем первую задачу
    const checkboxes = screen.getAllByRole('button', { name: /mark as complete/i });
    await user.click(checkboxes[0]);
    // Фильтр "Active"
    const activeFilter = screen.getByRole('button', { name: /active/i });
    await user.click(activeFilter);
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.getByText('Задача 3')).toBeInTheDocument();
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
    // Фильтр "Completed" (выбираем только фильтр, а не кнопку очистки)
    const completedFilter = screen.getAllByRole('button', { name: /completed/i }).find(btn => btn.textContent === 'Completed');
    await user.click(completedFilter);
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();
    // Фильтр "All"
    const allFilter = screen.getByRole('button', { name: /all/i });
    await user.click(allFilter);
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.getByText('Задача 3')).toBeInTheDocument();
  });

  test('очищает выполненные задачи', async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Задача 1');
    await user.keyboard('{Enter}');
    await user.type(input, 'Задача 2');
    await user.keyboard('{Enter}');
    // Выполняем первую задачу
    const checkboxes = screen.getAllByRole('button', { name: /mark as complete/i });
    await user.click(checkboxes[0]);
    // Очищаем выполненные
    const clearButton = screen.getByRole('button', { name: /clear completed/i });
    await user.click(clearButton);
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });
}); 