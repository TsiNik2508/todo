// src/App.tsx

import React, { useReducer, useState } from 'react';
import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import CustomCalendar from './components/CustomCalendar/CustomCalendar'; // Импорт календаря
import { Todo } from './types';
import './App.css';

type ActionType = 
  | { type: 'ADD_TODO'; text: string; dueDate?: Date; priority?: 'low' | 'medium' | 'high' }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'EDIT_TODO'; id: number; text: string }
  | { type: 'DELETE_COMPLETED' };

function todoReducer(state: Todo[], action: ActionType): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, 
        {
          id: Date.now(),
          text: action.text,
          completed: false,
          dueDate: action.dueDate,
          priority: action.priority || 'medium'
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    case 'DELETE_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'priority' | 'dueDate' | 'alphabetical'>('priority');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddTodo = (text: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high') => {
    dispatch({ type: 'ADD_TODO', text, dueDate, priority });
  };

  const handleSortChange = (order: 'priority' | 'dueDate' | 'alphabetical') => {
    setSortOrder(order);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOrder === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return (priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium']);
    }
    if (sortOrder === 'dueDate') {
      return (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) - (b.dueDate ? new Date(b.dueDate).getTime() : Infinity);
    }
    return a.text.localeCompare(b.text);
  });

  const filteredTodos = sortedTodos
    .filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    })
    .filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app">
      <h1 className="app__title">ToDo App</h1>

      <div className="app__container">
        {/* Боковая панель с меню */}
        <div className="app__sidebar">
          <div className="app__counter">
            <span>Active: {activeCount}</span>
            <span>Completed: {completedCount}</span>
          </div>

          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="app__search"
          />

          <div className="app__filters">
            <button className="app__filter-button" onClick={() => setFilter('all')}>All</button>
            <button className="app__filter-button" onClick={() => setFilter('active')}>Active</button>
            <button className="app__filter-button" onClick={() => setFilter('completed')}>Completed</button>
          </div>

          <div className="app__sort">
            <label>Sort by:</label>
            <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value as 'priority' | 'dueDate' | 'alphabetical')}>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          <button
            className="app__delete-completed"
            onClick={() => dispatch({ type: 'DELETE_COMPLETED' })}
          >
            Delete Completed
          </button>

          {/* Календарь для отображения задач */}
          <CustomCalendar todos={todos} />
        </div>

        {/* Основная область контента */}
        <div className="app__main">
          <TodoInput onAdd={handleAddTodo} />
          <TodoList 
            todos={filteredTodos} 
            onToggle={(id) => dispatch({ type: 'TOGGLE_TODO', id })} 
            onDelete={(id) => dispatch({ type: 'DELETE_TODO', id })} 
            onEdit={(id, text) => dispatch({ type: 'EDIT_TODO', id, text })}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
