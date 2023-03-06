import React, { useState } from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import styles from '../../styles/Register.module.css';
import Image from 'next/image';
import brand from '../../assets/brand.png';
import Link from 'next/link';
import InputPassword from '../../commons/InputPassword';
import InputFullName from '../../commons/InputFullname';
import InputEmail from '../../commons/InputEmail';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();

  const onSubmitOfRegister = (data: any) => {
    axios
      .post('http://localhost:5000/users/signup', data)
      .then((res) => res.data)
      .then(() => navigate.push('/'))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container maxWidth={'xs'}>
        <Box className={styles.boxspace}></Box>
        <Box className={styles.boxBrand}>
          <Image className={styles.brand} src={brand} alt="Fast Delivery Brand" />
        </Box>
        <form onSubmit={handleSubmit(onSubmitOfRegister)}>
          <InputFullName name="fullName" register={register} errors={errors} />
          <InputEmail name="email" register={register} errors={errors} />
          <InputPassword name="password" register={register} errors={errors} />
          {errors.password && <span className={styles.errorText}>*Contraseña Requerida*</span>}
          <Button fullWidth variant="contained" type="submit">
            Registrate
          </Button>
        </form>
        <Box className={styles.boxLinks}>
          <Link href="/">
            <Typography className={styles.TextLiks} variant="inherit" color="primary">
              Volver al inicio
            </Typography>
          </Link>
        </Box>
      </Container>
    </>
  );
}
