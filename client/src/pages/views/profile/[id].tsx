import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import {
  Container,
  Avatar,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import styles from '../../../styles/Profile.module.css';
import { useDispatch } from 'react-redux';
import { updateUserById } from '@/store/user';
import React, { useState } from 'react';
import { useAlert } from '../../../hook/Alerthook';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const showAlert = useAlert();
  const dispatch = useDispatch();

  const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
  const userId = user.id;
  console.log(userId, 'userId');

  const uploadImage = (event) => {
    const selectedPhoto = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedPhoto);
    reader.onload = () => {
      const photoString = reader.result;
      setSelectedImage(photoString);
    };
  };

  const handlePhoto = async () => {
    if (!userId) {
      console.error('User ID is not defined');
      return;
    }
    const updatedUser = await dispatch(updateUserById({ userId, photo: selectedImage }));
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    userFromLocalStorage.photo = selectedImage;
    localStorage.setItem('user', JSON.stringify(userFromLocalStorage));
    showAlert({
      message: 'La imagen ha sido agregada correctamente',
      typeAlert: 'success',
      showCloseButton: true,
    });
  };

  return (
    <>
      <Container maxWidth="xs" disableGutters={true}>
        <Header />
        {user.admin ? (
          <Link href={'/views/manage-schedule'}>
            <ArrowApp />
          </Link>
        ) : (
          <Link href={'/views/start-workday'}>
            <ArrowApp />
          </Link>
        )}
        {selectedImage ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={selectedImage} sx={{ height: '200px', width: '200px' }} />
          </Box>
        ) : user.photo ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={user.photo} sx={{ height: '200px', width: '200px' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ height: '200px', width: '200px' }} />
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '5%' }}>
          <Button variant="contained" component="label">
            Seleccionar imagen
            <input type="file" hidden onChange={uploadImage} />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          {selectedImage ? (
            <Button variant="text" onClick={() => handlePhoto(selectedImage)}>
              Guardar foto
            </Button>
          ) : null}
        </Box>
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
                {user.fullName}
              </Typography>
            </Box>
            <Box className={styles.boxInfo}>
              <Typography className={styles.userInfo} variant="inherit">
                Email:
              </Typography>
              <Typography className={styles.userInfoContent} variant="inherit">
                {user.email}
              </Typography>
            </Box>
            <Box className={styles.boxInfo}>
              <Typography className={styles.userInfo} variant="inherit">
                Status de usuario:
              </Typography>
              <Typography className={styles.userInfoContent} variant="inherit">
                {user.admin ? 'Admin' : 'Repartidor'}
              </Typography>
            </Box>
            <Box className={styles.boxInfo}>
              <Typography className={styles.userInfo} variant="inherit">
                Id:
              </Typography>
              <Typography className={styles.userInfoContent} variant="inherit">
                {user.id}
              </Typography>
            </Box>
          </Box>
        </Accordion>
      </Container>
    </>
  );
};

export default Profile;
