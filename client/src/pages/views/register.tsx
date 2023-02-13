/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Box, TextField, Container, Button, Typography } from '@mui/material';
import styles from '../../styles/Login.module.css';
import Image from 'next/image';
import brand from '../assets/brand.png';
import Head from 'next/head';
import Link from 'next/link';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <main>
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
              Registrate
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
            {' '}
            <Link href="/">
              {' '}
              <Typography
                sx={{ fontSize: '19px', fontWeight: '700', fontFamily: 'Roboto' }}
                variant="inherit"
                color="primary"
              >
                Volver al inicio
              </Typography>{' '}
            </Link>
          </Box>
        </Container>
      </main>
    </>
  );
}
