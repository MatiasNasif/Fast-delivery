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
import { useSnackbar } from 'notistack';

const AddPackage = () => {
  interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
  }

  const useInput = (): InputProps => {
    const [value, setValue] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
    const reset = () => {
      setValue('');
    };
    return { value, onChange: handleChange, reset };
  };

  const address = useInput();
  const receiver = useInput();
  const weight = useInput();
  const [value, setValue] = useState();

  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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

  const date = new Date(value?.$d.toDateString());
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString();
  const year: string = date.getFullYear().toString().slice(-2);
  const dateFormatted: string = `${day}/${month}/${year}`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      address: address.value,
      receiver: receiver.value,
      weight: Number(weight.value),
      deliveryDate: dateFormatted,
      quantity: count,
    };
    fetch(`${API_URL}/packages/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      address.reset();
      receiver.reset();
      weight.reset();
      setCount(0);
      enqueueSnackbar(
        `El paquete para ${receiver.value} a la dirección ${address.value} se agregó correctamente`,
        {
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          style: {
            fontSize: '16px',
            color: '#fffff',
            fontWeight: 'bold',
          },
        }
      );
    });
  };

  return (
    <>
      {' '}
      <Header />
      <Container maxWidth={'xs'}>
        <form onSubmit={handleSubmit}>
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha en la que debe ser repartido"
              value={value}
              autoFocus
              className={styles.dateContainer}
              sx={{
                marginTop: '20px',
                color: 'yellow',
              }}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField focused {...params} />}
            />
          </LocalizationProvider>

          <Box className={styles.boxContainer}>
            <ButtonApp typeofButton="submit" variantButton="contained">
              Agregar
            </ButtonApp>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddPackage;
