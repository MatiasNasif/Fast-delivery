import { TextField } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import React from 'react'


export default function InputFullName({ register }) {
  return (
    <>
      <TextField
        label="Email"
        InputLabelProps={{ className: styles.textLabelcolor }}
        variant="standard"
        name="email"
        sx={{ fontFamily: 'Roboto', marginTop: '10px' }}
        focused
        fullWidth
        {...register('email', { required: true })}
      />
    </>
  );
}
