import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useController } from 'react-hook-form';
import { UseControllerReturn } from 'react-hook-form';

const InputDatePicker = ({ control, name, label, defaultValue, className, sx, rules }) => {
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
    formState: { isSubmitting },
    setValue,
  } = useController({
    name,
    control,
    defaultValue: selectedDate,
    rules,
  }) as UseControllerReturn & { setValue: (name: string, value: any) => void };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Función para formatear la fecha en formato "MM/DD/YYYY"
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  const date = new Date(selectedDate?.$d.toDateString());
  const dateFormatted = formatDate(date);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        autoFocus
        className={className}
        sx={sx}
        renderInput={(params) => <TextField {...params} />}
        value={selectedDate}
        onChange={handleDateChange}
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
      />
    </LocalizationProvider>
  );
};

export default InputDatePicker;
