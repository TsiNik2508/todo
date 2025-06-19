import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onAddTodo: (text: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>todos</h1>
      <div className={styles.inputContainer}>
        <div className={styles.arrowIcon}>❯</div>
        <input
          type="text"
          className={styles.input}
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
}; 