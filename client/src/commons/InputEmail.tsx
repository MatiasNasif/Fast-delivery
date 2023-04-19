import { TextField, FormHelperText } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface Props {
  name: string;
  register: UseFormRegister<any>;
  errors: any;
}

export default function InputFullName({ name, register, errors }: Props) {
  return (
    <>
      <TextField
        {...register('email', { required: true })}
        margin="normal"
        error={!!errors?.email}
        variant="standard"
        focused
        InputLabelProps={{ className: styles.textLabelcolor }}
        label="Email"
        type="email"
        name="email"
        fullWidth
      />
      {errors?.email && <FormHelperText error={true}>Email Requerido</FormHelperText>}
    </>
  );
}
