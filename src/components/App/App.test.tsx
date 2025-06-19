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
}); 