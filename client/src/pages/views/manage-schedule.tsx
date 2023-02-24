import React from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
} from '@mui/material';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import styles from '../../styles/Schedule.module.css';
import brand from '../../assets/brand.png';
import avatarOne from '../../assets/avatar1.jpeg';
import Image from 'next/image';
import Header from '@/commons/header';
import Calendar from './day';
import Progress from './progress';
import CircleDummy from '../../dummy-data/Circular-Progress.json';

export default function ManageSchedule() {
  let date: Date = new Date();
  const dateNum = date.getMonth() + 1;
  const dateFullyear = date.getFullYear().toString().slice(-2);

  return (
    <>
      <Header />

      <Container disableGutters={true}>
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
            {CircleDummy.map((data, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', marginTop: '20px' }}>
                  <Progress value={data.circle} colorCircle={data.color} />
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
                      {data.name}
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
                      {data.activos} {data.status}
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
                      {data.nameBtn}
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
