import { TextField } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import { Props } from './InputEmail';

export default function InputFullName({ name, register, errors }: Props) {
  return (
    <>
      <TextField
        label="Full Name"
        InputLabelProps={{ className: styles.textLabelcolor }}
        variant="standard"
        sx={{ fontFamily: 'Roboto' }}
        focused
        fullWidth
        {...register('fullName', { required: true })}
      />
    </>
  );
}
