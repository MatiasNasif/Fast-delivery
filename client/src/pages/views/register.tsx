import React from 'react';
import { Box, TextField, Container, Button, Typography } from '@mui/material';
import styles from '../../styles/Register.module.css';
import Image from 'next/image';
import brand from '../../assets/brand.png';
import Link from 'next/link';
import InputPassword from '../../commons/InputPassword';

export default function Register() {
  return (
    <>
      <Container maxWidth={'xs'}>
        <Box className={styles.boxspace}></Box>
        <Box className={styles.boxBrand}>
          <Image className={styles.brand} src={brand} alt="Fast Delivery Brand" />
        </Box>
        <TextField
          label="Usuario"
          InputLabelProps={{ className: styles.textLabelcolor }}
          variant="standard"
          sx={{ fontFamily: 'Roboto' }}
          focused
          fullWidth
        />
        <InputPassword />
        <Button fullWidth variant="contained">
          Registrate
        </Button>
        <Box className={styles.boxLinks}>
          <Link href="/">
            {' '}
            <Typography
              className={styles.TextLiks}
              sx={{ fontWeight: '700' }}
              variant="inherit"
              color="primary"
            >
              Volver al inicio
            </Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
}
