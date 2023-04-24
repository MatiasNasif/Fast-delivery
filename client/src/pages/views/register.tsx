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
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userRegister } from '@/store/user';
import { useAlert } from '@/hook/Alerthook';
import Spinner from '@/commons/Spinner';
import 'animate.css';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

export default function Register() {
  const [animationLogin, setAnimationLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useRouter();
  const dispatch = useDispatch<any>();

  const onSubmitOfRegister = (data: RegisterFormData) => {
    dispatch(userRegister({ data, showAlert, navigate, setAnimationLogin, setIsLoading }));
  };
  return (
    <>
      {' '}
      {isLoading ? (
        <Spinner />
      ) : (
        <Container maxWidth={'xs'}>
          <Box className={styles.boxspace}></Box>
          <Box className={styles.boxBrand}>
            <Image
              className={`${
                styles.brand
              } animate__animated animate__backInLeft animate__duration-1s 
  ${animationLogin ? 'animate__animated animate__bounceOutRight animate__duration-1s' : ''}

`}
              src={brand}
              alt="Fast Delivery Brand"
            />
          </Box>
          <form onSubmit={handleSubmit(onSubmitOfRegister)}>
            <InputFullName name="fullName" register={register} errors={errors} />
            <InputEmail name="email" register={register} errors={errors} />
            <InputPassword name="password" register={register} errors={errors} />

            <Button fullWidth variant="contained" type="submit">
              Registrate
            </Button>
          </form>
          <Box className={styles.boxLinks}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Link href="/" onClick={() => setIsLoading(true)}>
                <Typography className={styles.TextLiks} variant="inherit" color="primary">
                  Volver al inicio
                </Typography>
              </Link>
            )}
          </Box>
        </Container>
      )}
    </>
  );
}
