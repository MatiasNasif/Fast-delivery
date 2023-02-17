import React from 'react';
import {
  Box,
  TextField,
  Container,
  Button,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
} from '@mui/material';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import styles from '../../styles/Schedule.module.css';
import brand from '../assets/brand.png';
import avatarOne from '../assets/avatar1.jpeg';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Calendar from './day';
import Progress from './progress';
import Paquetes from './paquetes.tsx';

export default function ManagerSchedule() {
  let date: Date = new Date();
  const dateNum = date.getMonth() + 1;
  const dateFullyear = date.getFullYear().toString().slice(-2);
  console.log('FULL YEAR ' + dateFullyear);
  return (
    <>
      <Head>
        <title>Gestionar Agenda</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Container disableGutters={true}>
        <Box
          component="form"
          sx={{
            width: '100%',
            height: '38px',
            display: 'flex',
            justifyContent: 'start',
            WebkitBoxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
            MozBoxShadow: ' 0px 2px 5px -1px rgba(0,0,0,0.75)',
            boxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
          }}
          noValidate
          autoComplete="off"
        >
          <Image
            className={styles.brand}
            src={brand}
            alt="Fast Delivery Brand"
            width={51}
            height={32}
          />
        </Box>
        <Box
          component="form"
          sx={{
            marginBottom: '30px',
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'start',
            marginLeft: '30px',
            maxWidth: '100%',
          }}
        >
          <Avatar sx={{ width: 50, height: 53 }}>
            <Image src={avatarOne} alt="avatar" className={styles.avatar} />
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Roboto',
                marginLeft: '20px',
                marginTop: '5px',
              }}
              variant="inherit"
              color="black"
            >
              Hola Admin!
            </Typography>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                fontFamily: 'Roboto',
                marginLeft: '20px',
                marginTop: '5px',
              }}
              variant="inherit"
              color="black"
            >
              Gestionar Pedidos
            </Typography>
          </Box>
        </Box>
        <Box>
          <Calendar />
        </Box>
        <Box mt={2}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownSharpIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {' '}
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '700',
                  fontFamily: 'Roboto',
                }}
                variant="inherit"
                color="black"
              >
                {date.getDate()}/{dateNum >= 1 ? '0' + dateNum : dateNum}/{dateFullyear} - Detalles
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '100%' }}></Typography>
            </AccordionSummary>
            <Box sx={{ display: 'flex', marginTop: '20px' }}>
              <Progress />
              <Box>
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: 'Roboto',
                    marginLeft: '20px',
                  }}
                  variant="inherit"
                  color="black"
                >
                  Repartidores
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Roboto',
                    marginLeft: '20px',
                    marginTop: '5px',
                  }}
                  variant="inherit"
                  color="black"
                >
                  2/10 activos
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginBottom: '5px',
              }}
            >
              <Box mt={2} px={2}>
                <Button fullWidth variant="contained" size="small" className={styles.box}>
                  Ver Repartidores
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
              <Paquetes />
              <Box>
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: 'Roboto',
                    marginLeft: '20px',
                  }}
                  variant="inherit"
                  color="black"
                >
                  Paquetes
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: 'Roboto',
                    marginLeft: '20px',
                    marginTop: '5px',
                  }}
                  variant="inherit"
                  color="black"
                >
                  16/20 Repartidos
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginBottom: '5px',
              }}
            >
              <Box mt={2} px={2}>
                <Button fullWidth variant="contained" size="small" className={styles.box}>
                  Ver Paquetes
                </Button>
              </Box>
            </Box>
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
