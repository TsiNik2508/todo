import React from 'react';
import type { Todo } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <section className={styles.todoList}>
      <ul className={styles.list}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}; 