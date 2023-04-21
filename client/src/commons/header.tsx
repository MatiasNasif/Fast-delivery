import { Box } from '@mui/material';
import Image from 'next/image';
import brand from '../assets/brand.png';
import styles from '../styles/Header.module.css';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/user';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { setPersistence } from '@/store/user';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(setPersistence());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  const onClickLogoutSession = () => {
    dispatch(userLogout()).then(() => navigate.push('/'));

    enqueueSnackbar(` Hasta Pronto ${user.fullName} `, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      style: {
        fontSize: '16px',
        color: '#fffff',
        alignItems: 'center',
        fontWeight: 'bold',
        backgroundColor: '#2196f3',
      },
    });
  };

  return (
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
  );
}
