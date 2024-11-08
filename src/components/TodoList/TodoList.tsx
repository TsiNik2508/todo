// src/components/TodoList/TodoList.tsx

import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../types';
import styles from './TodoList.module.css';

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void; 
}

const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </ul>
  );
};

export default TodoList;
