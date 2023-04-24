import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import { Container, Avatar, Box, Accordion, AccordionSummary, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import styles from '../../../styles/Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserById } from '@/store/user';
import React, { useCallback, useEffect, useState } from 'react';

import ButtonApp from '@/commons/buttonApp';

const Profile = () => {
  const [baseImage, setBaseImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);

  const uploadImage = (event) => {
    const selectedPhoto = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedPhoto);
    reader.onload = () => {
      const photoString = reader.result;
      setSelectedImage(photoString);
      setBaseImage(photoString);
    };
  };

  const handlePhoto = async (baseImage) => {
    if (!userId) {
      console.error('User ID is not defined');
      return;
    }
    const updatedUser = await dispatch(updateUserById({ userId, photo: baseImage }));
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    setSelectedImage(null);
  };

  console.log(user.photo, 'user.photo');
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

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar src={user.photo} sx={{ height: '200px', width: '200px' }} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <input type="file" onChange={uploadImage} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <ButtonApp variant="contained" color="primary" onClick={() => handlePhoto(baseImage)}>
            Guardar foto
          </ButtonApp>
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
