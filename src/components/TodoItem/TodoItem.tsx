import React from 'react';
import type { Todo } from '../../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={styles.todoItem}>
      <div className={styles.todoContent}>
        <button
          className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && (
            <svg className={styles.checkmark} viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </button>
        <span className={`${styles.todoText} ${todo.completed ? styles.completed : ''}`}>
          {todo.text}
        </span>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        ×
      </button>
    </li>
  );
}; 