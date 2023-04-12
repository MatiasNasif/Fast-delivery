import { Box } from '@mui/material';
import Image from 'next/image';
import brand from '../assets/brand.png';
import styles from '../styles/Header.module.css';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/user';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

const API_URL = 'http://localhost:5000';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state.user);

  const onClickLogoutSession = () => {
    dispatch(userLogout()).then(() => navigate.push('/'));
    const nameWithCapitalizedFirstLetter =
      user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1);

    enqueueSnackbar(` Hasta Pronto ${nameWithCapitalizedFirstLetter} `, {
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
