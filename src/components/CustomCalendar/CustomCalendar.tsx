import React, { useState } from 'react';
import styles from './CustomCalendar.module.css';
import { Todo } from '../../types';

interface CustomCalendarProps {
  todos: Todo[];
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ todos }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const taskDates = todos
    .filter(todo => todo.dueDate)
    .map(todo => new Date(todo.dueDate!))
    .filter(date => date.getMonth() === currentDate.getMonth())
    .map(date => date.getDate());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className={styles.weekdays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.weekday}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className={styles.emptyDay}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
          const day = dayIndex + 1;
          const isToday = day === today.getDate() &&
                          currentDate.getMonth() === today.getMonth() &&
                          currentDate.getFullYear() === today.getFullYear();
          const hasTask = taskDates.includes(day);

          return (
            <div
              key={day}
              className={`${styles.day} ${isToday ? styles.today : ''} ${hasTask ? styles.taskDay : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
