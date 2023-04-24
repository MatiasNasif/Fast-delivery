import React from 'react';
import { TextField, FormHelperText } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import { Props } from './InputEmail';

const InputAdress = ({ name, register, errors }: Props) => {
  return (
    <>
      {' '}
      <TextField
        label="Dirección"
        InputLabelProps={{ className: styles.labelColor }}
        variant="standard"
        error={!!errors?.address}
        sx={{ fontFamily: 'Roboto' }}
        focused
        fullWidth
        {...register('address', { required: true })}
      />
      {errors?.address && <FormHelperText error={true}>Direccion Requerida</FormHelperText>}
    </>
  );
};

export default InputAdress;
