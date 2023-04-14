import ArrowApp from '@/commons/arrowApp';
import React from 'react';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../../styles/AddPackage.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import ButtonApp from '@/commons/buttonApp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useInput from '@/utils/useInput';

const AddPackage = () => {
  const address = useInput();
  const receiver = useInput();
  const weight = useInput();
  const [value, setValue] = useState();
  /*  const fecha = new Date('1/04/23');
  console.log(fecha, 'fechaa'); */
  /* const fecha: string | undefined = value?.$d.toDateString();
  console.log(fecha); */

  const navigate = useRouter();

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

  const API_URL = 'http://localhost:5000';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      address: address.value,
      receiver: receiver.value,
      weight: Number(weight.value),
      deliveryDate: value?.$d.toDateString(),
      quantity: count,
    };

    fetch(`${API_URL}/packages/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => alert('Los datos se guardaron correctamente.'))
      .then(() => navigate.push('/views/manage-packages'));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Container maxWidth={'xs'}>
          <Box className={styles.arrow}>
            <Link href={'/views/manage-packages'}>
              <ArrowApp />
            </Link>
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
            {...address}
          />
          <TextField
            label="Nombre de quien recibe"
            InputLabelProps={{ className: styles.labelColor }}
            variant="standard"
            className={styles.input}
            focused
            fullWidth
            {...receiver}
          />
          <TextField
            label="Peso(Kg)"
            InputLabelProps={{ className: styles.labelColor }}
            variant="standard"
            className={styles.input}
            focused
            fullWidth
            {...weight}
          />
          <TextField
            label="Fecha en la que debe ser repartido"
            InputLabelProps={{ className: styles.labelColor }}
            variant="standard"
            className={styles.input}
            focused
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
          </LocalizationProvider>
          {/* <InputLabel
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
          </Box> */}
        </Container>
        <Box className={styles.boxContainer}>
          <button type="submit">
            <ButtonApp>Agregar</ButtonApp>
          </button>
        </Box>
      </form>
    </>
  );
};

export default AddPackage;
