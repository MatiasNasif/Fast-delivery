import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Inter } from '@next/font/google';
import styles from '../styles/Login.module.css';
import { Box, Container, Button, Typography } from '@mui/material';
import Image from 'next/image';
import brand from '../../src/assets/brand.png';
import Link from 'next/link';
import InputPassword from '../commons/InputPassword';
import InputEmail from '../commons/InputEmail';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@/store/user';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const inter = Inter({ subsets: ['latin'] });

interface LoginFormData {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:5000';

async function getAllFormSwornByUser(userId: string) {
  if (!userId) {
    return [];
  }
  const response = await axios.get(`${API_URL}/formsworn/getAll`, { params: { userId } });
  return response.data;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();
  const dispatch = useDispatch<any>();
  const userId: string = useSelector((state) => state.user?.id ?? null);
  const [formsByUser, setFormsByUser] = useState([]);
  const [hasFormToday, setHasFormToday] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitOfLogin = (data: LoginFormData) => {
    dispatch(userLogin({ data, enqueueSnackbar, navigate }));
  };
  useEffect(() => {
    if (userId !== null) {
      getAllFormSwornByUser(userId)
        .then((formSwornList) => {
          setFormsByUser(formSwornList);

          const today = new Date().toISOString().slice(0, 10); // Obtener la fecha actual en formato ISO
          const hasForm = formSwornList.some((form) => {
            return form.user === userId && form.createdAt.slice(0, 10) === today;
          });
          setHasFormToday(hasForm);

          if (hasForm) {
            navigate.push('/views/start-workday');
          } else {
            navigate.push('/views/sworn-statement');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth={'xs'}>
        <Box className={styles.boxspace}></Box>
        <Box className={styles.boxBrand}>
          <Image className={styles.brand} src={brand} alt="Fast Delivery Brand" />
        </Box>
        <form onSubmit={handleSubmit(onSubmitOfLogin)}>
          <InputEmail name="email" register={register} errors={errors} />
          <InputPassword name="password" register={register} errors={errors} />
          <Button fullWidth variant="contained" type="submit">
            Ingresar
          </Button>
        </form>
        <Box className={styles.boxLinks}>
          <Typography
            className={styles.TextLiks}
            sx={{ fontWeight: '300' }}
            variant="inherit"
            color="primary"
          >
            Recuperar contraseña
          </Typography>
          <Link href="/views/register">
            <Typography
              className={styles.TextLiks}
              sx={{ fontWeight: '700' }}
              variant="inherit"
              color="primary"
            >
              Registrarse
            </Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
}
