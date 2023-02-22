import React from 'react';
import styles from '../../styles/DaysOfWeek.module.css';

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'];

const DaysOfWeek: React.FC = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay() - 1;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {DAYS_OF_WEEK.map((day, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - currentDayOfWeek + index);
        const isCurrentDay = index === currentDayOfWeek;
        const numberDate = date.getDate();
        return (
          <div
            key={day}
            className={`${styles.day} ${isCurrentDay && styles.currentDay}`}
            style={{ padding: '10px' }}
          >
            <strong>{day}</strong>
            <br />
            {numberDate}
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
