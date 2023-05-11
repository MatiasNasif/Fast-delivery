import ArrowApp from '@/commons/arrowApp';
import React, { useState } from 'react';
import Header from '@/commons/header';
import { Typography, Box, TextField, FormControl, Container, FormHelperText } from '@mui/material';
import styles from '../../styles/AddPackage.module.css';
import ButtonApp from '@/commons/buttonApp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAlert } from '@/hook/Alerthook';
import { useForm } from 'react-hook-form';

interface User {
  admin: boolean;
}

const AddPackage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const user: User =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');

  if (user.admin === false) {
    router.push('/views/start-workday');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const showAlert = useAlert();

  const today = new Date();
  const minDate = new Date(today.getTime());
  const maxDate = new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000);
  const minDateStr = minDate.toISOString().slice(0, 10);
  const maxDateStr = maxDate.toISOString().slice(0, 10);

  const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

  const handleFormSubmit = (data) => {
    const formdata = {
      address: data.address,
      receiver: data.receiver,
      weight: Number(data.weight),
      deliveryDate: data.deliveryDate,
    };

    fetch(`${API_URL}/packages/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formdata),
    }).then((res) => {
      showAlert({
        message: `El paquete para ${data.receiver} a la dirección ${data.address} se agregó correctamente`,
        typeAlert: 'success',
        showCloseButton: true,
      });
      reset({ address: '', receiver: '', weight: '', deliveryDate: '' });
    });
  };

  return (
    <>
      {' '}
      <main>
        <Container maxWidth={'xs'} disableGutters={true}>
          <Header
            onClickedLogout={() => setIsLoading(true)}
            onClickedProfile={() => setIsLoading(true)}
          />

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
              <div className={'input-wrapper'}>
                <input
                  type="date"
                  {...register('deliveryDate', { required: true })}
                  min={minDateStr}
                  max={maxDateStr}
                />
              </div>

              {errors?.deliveryDate && (
                <FormHelperText error={true}>Fecha requerida</FormHelperText>
              )}
              <Box className={styles.boxContainer}>
                <ButtonApp typeofButton="submit" variantButton="contained">
                  Agregar
                </ButtonApp>
              </Box>
            </form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default AddPackage;
