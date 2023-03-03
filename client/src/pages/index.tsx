import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Login.module.css';
import { Box, TextField, Container, Button, Typography, FormControl } from '@mui/material';
import Image from 'next/image';
import brand from '../../src/assets/brand.png';
import Link from 'next/link';
import InputPassword from '../commons/InputPassword';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
        <FormControl className={styles.form}></FormControl>
        <TextField
          label="Usuario"
          InputLabelProps={{ className: styles.textLabelcolor }}
          variant="standard"
          sx={{ fontFamily: 'Roboto' }}
          focused
          fullWidth
        />
        <InputPassword />{' '}
        <Button fullWidth variant="contained">
          Ingresar
        </Button>
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
            {' '}
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
