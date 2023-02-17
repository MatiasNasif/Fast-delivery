/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Login.module.css';
import { Box, TextField, Container, Button, Typography } from '@mui/material';
import Image from 'next/image';
import brand from '../../src/assets/brand.png';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Container maxWidth={'xs'}>
        <Box
          component="form"
          sx={{
            width: '100%',
            height: '132px',
            display: 'flex',
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
        ></Box>
        <Box
          component="form"
          sx={{
            width: '100%',
            height: '151px',
            display: 'flex',
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
        >
          <Image
            className={styles.brand}
            src={brand}
            alt="Fast Delivery Brand"
            width={149}
            height={94}
          />
        </Box>
        <Box
          component="form"
          sx={{
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '100%',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Usuario"
            InputLabelProps={{ className: styles.textLabelcolor }}
            variant="standard"
            sx={{ fontFamily: 'Roboto' }}
            focused
            fullWidth
          />
        </Box>
        <Box
          component="form"
          sx={{ display: 'flex', justifyContent: 'center', maxWidth: '100%' }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Contraseña"
            InputLabelProps={{ className: styles.textLabelcolor }}
            variant="standard"
            sx={{ fontFamily: 'Roboto' }}
            focused
            fullWidth
          />
        </Box>
        <Box
          component="form"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            marginTop: '25px',
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
        >
          <Button fullWidth variant="contained">
            Ingresar
          </Button>
        </Box>
        <Box
          component="form"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            marginTop: '25px',
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            sx={{ fontSize: '19px', fontWeight: '300', fontFamily: 'Roboto' }}
            variant="inherit"
            color="primary"
          >
            Recuperar contraseña
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            marginTop: '25px',
            justifyContent: 'center',
          }}
          noValidate
          autoComplete="off"
        >
          <Link href="/views/register">
            {' '}
            <Typography
              sx={{ fontSize: '19px', fontWeight: '700', fontFamily: 'Roboto' }}
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
