import { Box } from '@mui/material';
import Image from 'next/image';
import brand from '../assets/brand.png';
import styles from '../styles/Header.module.css';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/user';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useAlert } from '@/hook/Alerthook';
import Link from 'next/link';
import Spinner from './Spinner';

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useRouter();

  const user = useSelector((state) => state.user);

  const onClickLogoutSession = () => {
    dispatch(userLogout({ setIsLoading })).then(() => navigate.push('/'));
    showAlert(
      {
        message: ` Hasta pronto ${user.fullName} `,
        typeAlert: 'default',
        showCloseButton: true,
      },
      { autoHideDuration: 3000 }
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box className={styles.header_container} component="form" noValidate autoComplete="off">
          <Link href={`/views/profile/${user.id}`}>
            <Image src={brand} alt="Fast Delivery Brand" className={styles.logo} />
          </Link>
          <Box className={styles.buttonApp_container}>
            <Button variant="text" onClick={onClickLogoutSession}>
              {' '}
              CERRAR SESSION
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
