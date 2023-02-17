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
        <KeyboardArrowLeftIcon
          sx={{
            fontSize: '32px',
            left: '10px',
            top: '60px',
          }}
        ></KeyboardArrowLeftIcon>
      </Box>

      <Box
        component="form"
        sx={{
          marginBottom: '20px',
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'start',
          marginLeft: '4%',
          maxWidth: '100%',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginTop: '2px',
            }}
            variant="h6"
          >
            Obtener paquetes
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 'normal',
              marginTop: '-3px',
            }}
          >
            ¿Cuántos paquetes más vas a repartir hoy?
          </Typography>
        </Box>
      </Box>
      {dummyData.map((dummy: any, i: number) => (
        <>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Checkbox
              {...label}
              defaultChecked
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, marginLeft: '10%', marginTop: '2%' }}
              color="info"
            />
            <Box>
              <Typography
                ml={2}
                variant="subtitle1"
                sx={{
                  fontSize: '12px',
                  width: '215px',
                  marginTop: '2%',
                  fontWeight: 'normal',
                  marginLeft: '26px',
                }}
              >
                {dummy.address}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  marginLeft: '26px',
                  marginTop: '13px',
                  marginBottom: '30px',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={DecNum}
                  variant="contained"
                  sx={{
                    height: '20px',
                    minWidth: '13px',
                    padding: '12px 1px 12px 1px',
                    marginRight: '13px',
                    border: '1px',
                    backgroundColor: 'white',
                    borderColor: '#B2BCCA',
                  }}
                >
                  <RemoveIcon sx={{ color: 'black' }} />
                </Button>

                {count}

                <Button
                  onClick={IncNum}
                  variant="contained"
                  className="buttonAdd"
                  sx={{
                    height: '20px',
                    padding: '12px 1px 12px 1px',
                    minWidth: '13px',
                    marginLeft: '13px',
                    border: '1px',
                    backgroundColor: 'white',
                    borderColor: '#B2BCCA',
                  }}
                >
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
