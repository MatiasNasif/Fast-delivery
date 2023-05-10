import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { updateUserById } from '@/store/user';
import { useRouter } from 'next/router';
import styles from '../../../styles/Profile.module.css';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import { useAlert } from '../../../hook/Alerthook';
import {
  Container,
  Avatar,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  Button,
  Input,
} from '@mui/material';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [upgradePhoto, setUpgradePhoto] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [userId, setUserId] = useState('');
  const [userInLocalStorage, setInLocalStorage] = useState('');
  const showAlert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
    setUserPhoto(user?.photo);
  }, []);

  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
    setUserId(user?.id);
  }, []);
  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
    setUserId(user?.id);
  }, []);

  useEffect(() => {
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
    setInLocalStorage(user);
  }, []);

  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  const uploadImage = (event: Event) => {
    if (event.target) {
      const selectedPhoto = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(selectedPhoto);
      reader.onload = () => {
        const photoString = reader.result;
        setSelectedImage(photoString);
      };
    }
  };

  const handlePhoto = async () => {
    if (!userId) {
      console.error('User ID is not defined');
      return;
    }
    setSavingPhoto(true);

    const updatedUser = await dispatch(
      updateUserById({
        userId,
        photo: selectedImage,
        admin: userInLocalStorage.admin,
      })
    );
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    userFromLocalStorage.photo = selectedImage;
    localStorage.setItem('user', JSON.stringify(userFromLocalStorage));
    showAlert({
      message: 'La imagen ha sido agregada correctamente',
      typeAlert: 'success',
      showCloseButton: true,
    });
    setUpgradePhoto(selectedImage);
    setSavingPhoto(false);
  };

  return (
    <>
      <Container maxWidth="xs" disableGutters={true}>
        <Header
          onClickedLogout={() => setIsLoading(true)}
          onClickedProfile={() => setIsLoading(true)}
          upgradePhotoinHeader={upgradePhoto}
        />
        {userInLocalStorage.admin ? (
          <Link href={'/views/manage-schedule'}>
            <ArrowApp onClick={function (): void {}} />
          </Link>
        ) : (
          <Link href={'/views/start-workday'}>
            <ArrowApp onClick={function (): void {}} />
          </Link>
        )}
        {selectedImage ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ height: '200px', width: '200px' }}>
              <Image src={selectedImage} width="200" height="200" alt="Avatar" />
            </Avatar>
          </Box>
        ) : userPhoto ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ height: '200px', width: '200px' }}>
              <Image src={userPhoto} width="200" height="200" alt="Avatar" />
            </Avatar>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ height: '200px', width: '200px' }}>
              <Image src={''} width="200" height="200" alt="Avatar" />
            </Avatar>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '5%' }}>
          <Button variant="contained" component="label">
            Seleccionar imagen
            <Input type="file" onChange={uploadImage} sx={{ display: 'none' }} />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {selectedImage ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {!savingPhoto && (
                <Button variant="text" onClick={() => handlePhoto(selectedImage)}>
                  Guardar foto
                </Button>
              )}
            </Box>
          ) : null}
        </Box>
        <Box className={styles.box}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ArrowDropDownRoundedIcon />}
              aria-controls="panel1a-content"
            >
              <Typography className={styles.title} variant="inherit">
                Información del repartidor
              </Typography>
            </AccordionSummary>
            <Box className={styles.boxInfoMost}>
              <Box className={styles.boxInfo}>
                <Typography className={styles.userInfo} variant="inherit">
                  Nombre:
                </Typography>
                <Typography className={styles.userInfoContent} variant="inherit">
                  {userInLocalStorage.fullName}
                </Typography>
              </Box>
              <Box className={styles.boxInfo}>
                <Typography className={styles.userInfo} variant="inherit">
                  Email:
                </Typography>
                <Typography className={styles.userInfoContent} variant="inherit">
                  {userInLocalStorage.email}
                </Typography>
              </Box>
              <Box className={styles.boxInfo}>
                <Typography className={styles.userInfo} variant="inherit">
                  Status de usuario:
                </Typography>
                <Typography className={styles.userInfoContent} variant="inherit">
                  {userInLocalStorage.admin ? 'Admin' : 'Repartidor'}
                </Typography>
              </Box>
              <Box className={styles.boxInfo}>
                <Typography className={styles.userInfo} variant="inherit">
                  Id:
                </Typography>
                <Typography className={styles.userInfoContent} variant="inherit">
                  {userInLocalStorage.id}
                </Typography>
              </Box>
            </Box>
          </Accordion>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
