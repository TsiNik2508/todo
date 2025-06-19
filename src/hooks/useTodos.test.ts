/// <reference types="vitest" />
import { renderHook, act, cleanup } from '@testing-library/react';
import { useTodos } from './useTodos';

afterEach(() => { cleanup(); });

describe('useTodos', () => {
  it('добавляет новую задачу', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Test todo');
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('не добавляет пустую задачу', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('');
      result.current.addTodo('   ');
    });
    expect(result.current.todos).toHaveLength(0);
  });

  it('переключает статус выполнения задачи', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Test todo');
    });
    const todoId = result.current.todos[0].id;
    act(() => {
      result.current.toggleTodo(todoId);
    });
    expect(result.current.todos[0].completed).toBe(true);
    act(() => {
      result.current.toggleTodo(todoId);
    });
    expect(result.current.todos[0].completed).toBe(false);
  });
}); 