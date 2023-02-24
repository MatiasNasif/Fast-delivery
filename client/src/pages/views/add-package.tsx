import ArrowApp from '@/commons/arrowApp';
import Header from '@/commons/header';
import {
  Typography,
  Box,
  TextField,
  FormControl,
  Button,
  InputLabel,
  Container,
} from '@mui/material';
import styles from '../../styles/AddPackage.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import ButtonApp from '@/commons/buttonApp';

const AddPackage = () => {
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
    <>
      <Header />
      <Container maxWidth={'xs'}>
        <Box className={styles.arrow}>
          <ArrowApp />
        </Box>
        <Box>
          <Typography variant="h6" className={styles.wordAdd}>
            Agregar paquetes
          </Typography>
        </Box>
        <FormControl className={styles.formAdd}></FormControl>
        <TextField
          label="Dirección"
          InputLabelProps={{ className: styles.labelColor }}
          variant="standard"
          className={styles.input}
          focused
          fullWidth
        />
        <TextField
          label="Nombre de quien recibe"
          InputLabelProps={{ className: styles.labelColor }}
          variant="standard"
          className={styles.input}
          focused
          fullWidth
        />
        <TextField
          label="Peso(Kg)"
          InputLabelProps={{ className: styles.labelColor }}
          variant="standard"
          className={styles.input}
          focused
          fullWidth
        />
        <TextField
          label="Fecha en la que debe ser repartido"
          InputLabelProps={{ className: styles.labelColor }}
          variant="standard"
          className={styles.input}
          focused
          fullWidth
        />
        <InputLabel
          sx={{ fontSize: '12px', marginTop: '20px' }}
          className={styles.labelColor}
          focused={true}
        >
          Cantidad
        </InputLabel>
        <Box>
          <Box className={styles.boxContainIconsPackage}>
            <Button onClick={DecNum} variant="contained" className={styles.buttonRemovePackage}>
              <RemoveIcon sx={{ color: 'black' }} />
            </Button>

            {count}

            <Button onClick={IncNum} variant="contained" className={styles.buttonAddPackage}>
              <AddIcon sx={{ color: 'black' }} />
            </Button>
          </Box>
        </Box>
      </Container>
      <Box className={styles.boxContainer}>
        <ButtonApp>Agregar</ButtonApp>
      </Box>
    </>
  );
};

export default AddPackage;
