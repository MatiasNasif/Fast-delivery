import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import { Container, Avatar, Box, Accordion, AccordionSummary, Typography } from '@mui/material';
import Link from 'next/link';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import styles from '../../../styles/Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPersistence } from '@/store/user';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPersistence());
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  console.log(user);
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
          <Avatar sx={{ height: '200px', width: '200px' }} />
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
