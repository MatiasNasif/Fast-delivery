import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from '../styles/DaysOfWeek.module.css';

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

interface Package {
  deliveryStatus: string;
}

interface Props {
  updatePackagesByDate: (newPackages: Package[], date: string) => void;
}

const DaysOfWeek = ({ updatePackagesByDate }: Props) => {
  const [today, setToday] = useState(new Date());
  const currentDayOfWeek: number = today.getDay();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(currentDayOfWeek);

  useMemo(() => {
    setToday(new Date());
  }, []);

  const handleDayClick = (selectDay: number, selectDate: Date) => {
    setSelectedDay(selectDay);
    const day: string = selectDate.getDate().toString().padStart(2, '0');
    const month: string = (selectDate.getMonth() + 1).toString();
    const year: string = selectDate.getFullYear().toString().slice(-2);
    const dateFormatted: string = `${day}-${month}-${year}`;

    fetch(`${urlApi}/packages/${dateFormatted}/delivery-date`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((packageByDate: Package[]) => {
        updatePackagesByDate(packageByDate, dateFormatted);
      })
      .catch((error) => console.log(error));
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const scrollPosition: number = container.scrollLeft;
    const selectedDay: number = Math.round((scrollPosition / container.offsetWidth) * 5);
    setSelectedDay(selectedDay);
  };

  useEffect(() => {
    const daysInMonth: number = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const monthEndDayOfWeek: number = new Date(
      today.getFullYear(),
      today.getMonth(),
      daysInMonth
    ).getDay();
    const firstDate: Date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - currentDayOfWeek
    );
    const lastDate: Date = new Date(today.getFullYear(), today.getMonth(), daysInMonth);
    lastDate.setDate(lastDate.getDate() + (6 - monthEndDayOfWeek));
    const dates: Date[] = [];
    for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    setDates(dates);
    setSelectedDay(currentDayOfWeek);
    if (containerRef.current) {
      containerRef.current.scrollLeft =
        (currentDayOfWeek - 2) * (containerRef.current.offsetWidth / 5);
    }
  }, [currentDayOfWeek, today]);

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
