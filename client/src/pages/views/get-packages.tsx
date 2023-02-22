import { Container, Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import brand from '../../assets/brand.png';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import dummyData from '../../dummy-data/package-dummy.json';
import styles from '../../styles/GetPackages.module.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function GetPackages() {
  const [count, setCount] = useState(0);
  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
      alert('min limit reached');
    }
  };
  return (
    <Container maxWidth={'xs'} disableGutters={true}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '10px',
          background: '#FFFFFF',
          WebkitBoxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
          MozBoxShadow: ' 0px 2px 5px -1px rgba(0,0,0,0.75)',
          boxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
        }}
        noValidate
        autoComplete="off"
      >
        <Image
          src={brand}
          alt="Fast Delivery Brand"
          width={51}
          height={32}
          style={{ marginBottom: '5px' }}
        />
      </Box>

      <Box>
        <KeyboardArrowLeftIcon className={styles.keyboardArrowLeftIcon}></KeyboardArrowLeftIcon>
      </Box>

      <Box className={styles.boxGetAndHowMany}>
        <Box>
          <Typography className={styles.wordGet} variant="h6">
            Obtener paquetes
          </Typography>
          <Typography className={styles.wordHowMany}>
            ¿Cuántos paquetes más vas a repartir hoy?
          </Typography>
        </Box>
      </Box>
      {dummyData.map((dummy: any, i: number) => (
        <>
          <Box sx={{ display: 'flex' }}>
            <Checkbox
              {...label}
              defaultChecked
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, marginLeft: '10%', marginTop: '2%' }}
              color="info"
            />
            <Box>
              <Typography ml={2} variant="subtitle1" className={styles.boxAddress}>
                {dummy.address}
              </Typography>
              <Box className={styles.boxContainIcons}>
                <Button onClick={DecNum} variant="contained" className={styles.buttonRemove}>
                  <RemoveIcon sx={{ color: 'black' }} />
                </Button>

                {count}

                <Button onClick={IncNum} variant="contained" className={styles.buttonAdd}>
                  <AddIcon sx={{ color: 'black' }} />
                </Button>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ m: '5%' }} />
        </>
      ))}
      <Box mt={2} px={2}>
        <Button
          fullWidth
          variant="contained"
          size="small"
          sx={{ borderRadius: '5px', fontSize: '15px', backgroundColor: '#217BCE' }}
        >
          INICIAR JORNADA
        </Button>
      </Box>
    </Container>
  );
}
