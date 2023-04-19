import { TextField, FormHelperText } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import { Props } from './InputEmail';

const InputReceiver = ({ name, register, errors }: Props) => {
  return (
    <>
      <TextField
        label="Nombre de quien recibe"
        InputLabelProps={{ className: styles.textLabelcolor }}
        variant="standard"
        error={!!errors?.receiver}
        sx={{ fontFamily: 'Roboto' }}
        focused
        fullWidth
        {...register('receiver', { required: true })}
      />
      {errors?.receiver && <FormHelperText error={true}>Nombre Requerido</FormHelperText>}
    </>
  );
};

export default InputReceiver;
