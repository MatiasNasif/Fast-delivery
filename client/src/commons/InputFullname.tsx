import { TextField } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';

export default function InputFullName({ register }) {
  return (
    <>
      <TextField
        label="Full Name"
        InputLabelProps={{ className: styles.textLabelcolor }}
        variant="standard"
        name="fullName"
        sx={{ fontFamily: 'Roboto' }}
        focused
        fullWidth
        {...register('fullName', { required: true })}
      />
    </>
  );
}
