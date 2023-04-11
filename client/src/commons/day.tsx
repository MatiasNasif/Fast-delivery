import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/DaysOfWeek.module.css';

const DaysOfWeek: React.FC = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const [selectedDay, setSelectedDay] = useState(currentDayOfWeek);
  const [dates, setDates] = useState<Date[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDayClick = (day: number, date: Date) => {
    setSelectedDay(day);
    console.log(date);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const scrollPosition = container.scrollLeft;
    const selectedDay = Math.round((scrollPosition / container.offsetWidth) * 5);
    setSelectedDay(selectedDay);
  };

  useEffect(() => {
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthEndDayOfWeek = new Date(today.getFullYear(), today.getMonth(), daysInMonth).getDay();
    const firstDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - currentDayOfWeek
    );
    const lastDate = new Date(today.getFullYear(), today.getMonth(), daysInMonth);
    lastDate.setDate(lastDate.getDate() + (6 - monthEndDayOfWeek));
    const dates = [];
    for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    setDates(dates);
    setSelectedDay(currentDayOfWeek);
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        (currentDayOfWeek - 2) * (containerRef.current.offsetWidth / 5);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef} onScroll={handleScroll}>
      <div className={styles.daysContainer}>
        {dates.map((date, index) => {
          const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'short' });
          const isCurrentDay = date.getDate() === today.getDate();
          const isSelectedDay = index === selectedDay;
          const numberDate = date.getDate();
          const isOutOfRange = date.getMonth() !== today.getMonth();
          const dateClassNames = [
            styles.day,
            isCurrentDay && styles.currentDay,
            isSelectedDay && styles.selectedDay,
            isOutOfRange && styles.outOfRange,
          ].join(' ');
          return (
            <button
              key={dayOfWeek + numberDate}
              className={dateClassNames}
              onClick={() => handleDayClick(index, date)}
            >
              <strong>{dayOfWeek}</strong>
              <br />
              {numberDate}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaysOfWeek;
