import { Container, Box, Typography, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import dummyData from '../../dummy-data/package-dummy.json';
import styles from '../../styles/GetPackages.module.css';
import Header from '../../commons/header';
import ButtonApp from '../../commons/ButtonApp';
import ArrowApp from '../../commons/ArrowApp';

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
      <Header />
      <ArrowApp />

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
      <Box className={styles.boxContainer}>
        <ButtonApp>Iniciar Jornada</ButtonApp>
      </Box>
    </Container>
  );
}
