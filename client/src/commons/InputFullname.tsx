import { TextField, FormHelperText } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import { Props } from './InputEmail';

export default function InputFullName({ name, register, errors }: Props) {
  return (
    <>
      <TextField
        label="Nombre y Apellido"
        InputLabelProps={{ className: styles.textLabelcolor }}
        variant="standard"
        error={!!errors?.fullName}
        sx={{ fontFamily: 'Roboto' }}
        focused
        fullWidth
        {...register('fullName', { required: true })}
      />
      {errors?.fullName && (
        <FormHelperText error={true}>Nombre y Apellido Requeridos</FormHelperText>
      )}
    </>
  );
}
