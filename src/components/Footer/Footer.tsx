import React from 'react';
import type { FilterType } from '../../types';
import styles from './Footer.module.css';

interface FooterProps {
  activeCount: number;
  completedCount: number;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  completedCount,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'active', label: 'Active' },
    { type: 'completed', label: 'Completed' },
  ];

  return (
    <footer className={styles.footer}>
      <span className={styles.count}>
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      
      <ul className={styles.filters}>
        {filters.map(filter => (
          <li key={filter.type}>
            <button
              className={`${styles.filterButton} ${
                currentFilter === filter.type ? styles.active : ''
              }`}
              onClick={() => onFilterChange(filter.type)}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>

      {completedCount > 0 && (
        <button
          className={styles.clearButton}
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}; 