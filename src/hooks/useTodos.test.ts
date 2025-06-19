/// <reference types="vitest" />
import { renderHook, act, cleanup } from '@testing-library/react';
import { useTodos } from './useTodos';

afterEach(() => { cleanup(); });

describe('useTodos', () => {
  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Test todo');
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('should not add empty todos', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('');
      result.current.addTodo('   ');
    });
    expect(result.current.todos).toHaveLength(0);
  });

  it('should toggle todo completion', () => {
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

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Test todo 1');
      result.current.addTodo('Test todo 2');
    });
    const todoId = result.current.todos[0].id;
    act(() => {
      result.current.deleteTodo(todoId);
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo 2');
  });

  it('should clear completed todos', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Test todo 1');
      result.current.addTodo('Test todo 2');
      result.current.addTodo('Test todo 3');
    });
    const todo1Id = result.current.todos[0].id;
    const todo3Id = result.current.todos[2].id;
    act(() => {
      result.current.toggleTodo(todo1Id);
      result.current.toggleTodo(todo3Id);
    });
    act(() => {
      result.current.clearCompleted();
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('Test todo 2');
  });

  it('should filter todos correctly', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Active todo 1');
      result.current.addTodo('Active todo 2');
      result.current.addTodo('Completed todo 1');
    });
    const completedTodoId = result.current.todos[2].id;
    act(() => {
      result.current.toggleTodo(completedTodoId);
    });
    // Test 'all' filter (default)
    expect(result.current.filteredTodos).toHaveLength(3);
    // Test 'active' filter
    act(() => {
      result.current.setFilterType('active');
    });
    expect(result.current.filteredTodos).toHaveLength(2);
    expect(result.current.filteredTodos.every(todo => !todo.completed)).toBe(true);
    // Test 'completed' filter
    act(() => {
      result.current.setFilterType('completed');
    });
    expect(result.current.filteredTodos).toHaveLength(1);
    expect(result.current.filteredTodos[0].completed).toBe(true);
  });

  it('should count active and completed todos correctly', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('Active todo 1');
      result.current.addTodo('Active todo 2');
      result.current.addTodo('Completed todo 1');
    });
    expect(result.current.activeCount).toBe(3);
    expect(result.current.completedCount).toBe(0);
    const completedTodoId = result.current.todos[2].id;
    act(() => {
      result.current.toggleTodo(completedTodoId);
    });
    expect(result.current.activeCount).toBe(2);
    expect(result.current.completedCount).toBe(1);
  });
}); 