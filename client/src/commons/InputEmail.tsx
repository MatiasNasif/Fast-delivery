import { TextField } from '@mui/material';
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
        {...register(name)}
        // {...(errors[name] && { error: true, helperText: 'Campo requerido' })}
        margin="normal"
        variant="outlined"
        label="Email"
        type="email"
        name="email"
        fullWidth
      />
    </>
  );
}
