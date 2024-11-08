import React, { useState } from 'react';
import { Todo } from '../../types';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <li className={`${styles.todoItem} ${isOverdue ? styles.todoItem__overdue : ''}`}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
        className={styles.todoItem__checkbox}
      />
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className={styles.todoItem__editInput}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span 
          className={`${styles.todoItem__text} ${todo.completed ? styles.todoItem__textCompleted : ''}`}
          onDoubleClick={handleEdit}
        >
          {todo.text}
        </span>
      )}
      {todo.priority && (
        <span className={`${styles[`todoItem__priority--${todo.priority}`]}`}>
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </span>
      )}
      {todo.dueDate && (
        <span className={styles.todoItem__dueDate}>
          Due: {new Date(todo.dueDate).toLocaleDateString()}
        </span>
      )}
      <button 
        className={styles.todoItem__deleteButton}
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
