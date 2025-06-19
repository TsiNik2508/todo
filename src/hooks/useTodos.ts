import { useState, useCallback, useMemo } from 'react';
import type { Todo, FilterType } from '../types';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Добавление новой задачи
  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
      };
      setTodos(prev => [...prev, newTodo]);
    }
  }, []);

  // Переключение статуса задачи
  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Удаление задачи
  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Очистка выполненных задач
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Изменение фильтра
  const setFilterType = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  // Отфильтрованные задачи
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Количество активных задач
  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  // Количество выполненных задач
  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  return {
    todos,
    filteredTodos,
    filter,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilterType,
  };
}; 