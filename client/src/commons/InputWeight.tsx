import { TextField, FormHelperText } from '@mui/material';
import styles from '../../../client/src/styles/Register.module.css';
import { Props } from './InputEmail';

const InputWeight = ({ name, register, errors }: Props) => {
  return (
    <>
      <TextField
        label="Peso(Kg)"
        InputLabelProps={{ className: styles.textLabelcolor }}
        variant="standard"
        error={!!errors?.weight}
        sx={{ fontFamily: 'Roboto' }}
        focused
        fullWidth
        {...register('weight', { required: true })}
      />
      {errors?.weight && <FormHelperText error={true}>peso requerido</FormHelperText>}
    </>
  );
};

export default InputWeight;
