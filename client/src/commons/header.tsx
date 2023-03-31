import { Box } from '@mui/material';
import Image from 'next/image';
import brand from '../assets/brand.png';
import styles from '../styles/Header.module.css';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/user';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:5000';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const onClickLogoutSession = () => {
    dispatch(userLogout()).then(() => navigate.push('/'));
  };

  return (
    <Box className={styles.header_container} component="form" noValidate autoComplete="off">
      <Image src={brand} alt="Fast Delivery Brand" className={styles.logo} />
      <Box className={styles.buttonApp_container}>
        <Button variant="text" onClick={onClickLogoutSession}>
          {' '}
          CERRAR SESSION
        </Button>
      </Box>
    </Box>
  );
}
