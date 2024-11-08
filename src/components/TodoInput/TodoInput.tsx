import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './TodoInput.module.css';

interface Props {
  onAdd: (text: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high') => void;
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, dueDate || undefined, priority);
      setText('');
      setDueDate(null);
      setPriority('medium');
    }
  };

  return (
    <form className={styles.todoInput} onSubmit={handleSubmit}>
      <input 
        className={styles.todoInput__field}
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter a new task" 
      />
      <DatePicker
        selected={dueDate}
        onChange={(date: Date | null) => setDueDate(date)}
        placeholderText="Select due date"
        className={styles.todoInput__date}
      />
      <select 
        className={styles.todoInput__priority} 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className={styles.todoInput__button} type="submit">Add</button>
    </form>
  );
};

export default TodoInput;
