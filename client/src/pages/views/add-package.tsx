import ArrowApp from '@/commons/arrowApp';
import React from 'react';
import Header from '@/commons/header';
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  InputLabel,
  Container,
  FormHelperText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../../styles/AddPackage.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import ButtonApp from '@/commons/buttonApp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import useInput from '@/utils/useInput';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import withAdminAuth from '@/commons/withAdminAuth';

const AddPackage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [count, setCount] = useState(0);
  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
      alert('min limit reached');
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

  const handleFormSubmit = (data) => {
    const date = data.deliveryDate;
    const dateArray = date.split('-');
    const year = dateArray[0].slice(-2);
    const month = Number(dateArray[1]).toString();
    const newDate = `${dateArray[2]}/${month}/${year}`;

    const formdata = {
      address: data.address,
      receiver: data.receiver,
      weight: Number(data.weight),
      deliveryDate: newDate,
    };

    console.log(formdata);
    fetch(`${API_URL}/packages/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    }).then((res) => {
      enqueueSnackbar(
        `El paquete para ${data.receiver} a la dirección ${data.address} se agregó correctamente`,
        {
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          style: {
            fontSize: '16px',
            color: '#fffff',
            fontWeight: 'bold',
          },
        }
      );
      reset({ address: '', receiver: '', weight: '', deliveryDate: '' });
    });
  };

  return (
    <>
      {' '}
      <Header />
      <Container maxWidth={'xs'}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box className={styles.arrow}>
            <Link href={'/views/manage-packages'}>
              <ArrowApp />
            </Link>
          </Box>
          <Box>
            <Typography variant="h6" className={styles.wordAdd}>
              Agregar paquetes
            </Typography>
          </Box>
          <FormControl className={styles.formAdd}></FormControl>
          <TextField
            label="Dirección"
            InputLabelProps={{ className: styles.labelColor }}
            variant="standard"
            className={styles.input}
            focused
            fullWidth
            {...register('address', { required: true })}
          />
          {errors?.address && (
            <FormHelperText error={true}>La dirección es requerida</FormHelperText>
          )}
          <TextField
            label="Nombre de quien recibe"
            InputLabelProps={{ className: styles.labelColor }}
            variant="standard"
            className={styles.input}
            focused
            fullWidth
            {...register('receiver', { required: true })}
          />

          {errors?.receiver && (
            <FormHelperText error={true}>Nombre de quien recibe requerido</FormHelperText>
          )}
          <TextField
            label="Peso(Kg)"
            InputLabelProps={{ className: styles.labelColor }}
            variant="standard"
            className={styles.input}
            focused
            fullWidth
            {...register('weight', { required: true })}
          />
          {errors?.weight && <FormHelperText error={true}>Peso requerido</FormHelperText>}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha en la que debe ser repartido"
              autoFocus
              className={styles.dateContainer}
              sx={{
                marginTop: '20px',
                color: 'yellow',
              }}
              {...register('date', { required: true })}
              renderInput={(params) => <TextField focused {...params} />}
            />
          </LocalizationProvider> */}
          <div className={'input-wrapper'}>
            <input type="date" {...register('deliveryDate', { required: true })} />
          </div>

          {errors?.deliveryDate && <FormHelperText error={true}>Falta la fecha pa</FormHelperText>}
          <Box className={styles.boxContainer}>
            <ButtonApp typeofButton="submit" variantButton="contained">
              Agregar
            </ButtonApp>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddPackage;
