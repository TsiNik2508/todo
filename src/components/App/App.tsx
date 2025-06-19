import React from 'react';
import { Header } from '../Header/Header';
import { TodoList } from '../TodoList/TodoList';
import { Footer } from '../Footer/Footer';
import { useTodos } from '../../hooks/useTodos';
import styles from './App.module.css';

export const App: React.FC = () => {
  const {
    filteredTodos,
    filter,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilterType,
  } = useTodos();

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header onAddTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        {(activeCount > 0 || completedCount > 0) && (
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            currentFilter={filter}
            onFilterChange={setFilterType}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
}; 