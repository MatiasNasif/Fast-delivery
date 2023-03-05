import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Login.module.css';
import { Box, Container, Button, Typography } from '@mui/material';
import Image from 'next/image';
import brand from '../../src/assets/brand.png';
import Link from 'next/link';
import InputPassword from '../commons/InputPassword';
import InputEmail from '../commons/InputEmail';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitOfLogin = (data) => {
    axios.post('https://localhost:5000/auth/login', data).then((res) => res.data);
  };

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
          <InputEmail name="email" register={register} />
          <InputPassword name="password" register={register} errors={errors} />
          {errors.password && <span className={styles.errorText}>*Contraseña Requerida*</span>}
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
