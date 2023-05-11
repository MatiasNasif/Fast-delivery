import { Box } from '@mui/material';
import Image from 'next/image';
import brand from '../assets/brand.png';
import styles from '../styles/Header.module.css';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/store/user';
import { useRouter } from 'next/router';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { useAlert } from '@/hook/Alerthook';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Spinner from './Spinner';
import Avatar from '@mui/material/Avatar';

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

interface ClickLoader {
  onClickedLogout: () => void;
  onClickedProfile: () => void;
  upgradePhotoinHeader: string;
}
export default function Header({
  onClickedLogout,
  onClickedProfile,
  upgradePhotoinHeader,
}: ClickLoader) {
  const [isLoading, setIsLoading] = useState(true);
  const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
  const userId = user.id;

  const [userPhoto, setUserPhoto] = useState('');
  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
    setUserPhoto(user?.photo);
  }, []);

  const showAlert = useAlert();
  const dispatch = useDispatch();
  const navigate = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogoutSession = () => {
    dispatch(userLogout({ setIsLoading })).then(() => navigate.push('/'));
    localStorage.removeItem('userLoggedInBefore');
    onClickedLogout();
    showAlert(
      {
        message: ` Hasta pronto ${user.fullName} `,
        typeAlert: 'success',
        showCloseButton: true,
      },
      { autoHideDuration: 3000 }
    );
  };

  return (
    <>
      {!isLoading ? (
        <Spinner />
      ) : (
        <Box className={styles.header_container} component="form" noValidate autoComplete="off">
          <Image src={brand} alt="Fast Delivery Brand" className={styles.logo} />
          <Box className={styles.buttonApp_container}>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar className={styles.iconButtonAccount}>
                  <Image
                    src={upgradePhotoinHeader ? upgradePhotoinHeader : userPhoto}
                    width="30"
                    height="30"
                    alt="Avatar"
                  />
                </Avatar>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Link href={`/views/profile/${user?.id}`} onClick={() => onClickedProfile()}>
                  <MenuItem onClick={handleClose}>Mi Cuenta</MenuItem>
                </Link>
                <MenuItem onClick={onClickLogoutSession}>Cerrar sesion</MenuItem>
              </Menu>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
}
