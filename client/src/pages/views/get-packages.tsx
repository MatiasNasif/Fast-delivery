import { Container, Box, Typography, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import styles from '../../styles/GetPackages.module.css';
import Header from '../../commons/header';
import ButtonApp from '../../commons/buttonApp';
import ArrowApp from '../../commons/arrowApp';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPersistence } from '@/store/user';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Package {
  weight: number;
  address: string;
  _id: string;
}

export default function GetPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const dispatch = useDispatch();

  const API_URL = 'http://localhost:5000';

  const navigate = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/packages/packagesPending`)
      .then((response) => response.json())
      .then((packages) => setPackages(packages))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    dispatch(setPersistence());
  }, [dispatch]);
  const userRedux = useSelector((state) => state.user);
  const userId = userRedux.id;

  const handleChange = (packageId: string) => {
    const index = selectedPackages.indexOf(packageId);

    if (index === -1) {
      setSelectedPackages([...selectedPackages, packageId]);
    } else {
      setSelectedPackages([
        ...selectedPackages.slice(0, index),
        ...selectedPackages.slice(index + 1),
      ]);
    }
  };

  const handleSubmit = () => {
    if (selectedPackages.length > 0) {
      const body = JSON.stringify({ packs: selectedPackages });

      fetch(`${API_URL}/users/${userId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
        .then((response) => response.json())
        .then(() => navigate.push('/views/start-workday'))
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Container maxWidth={'xs'} disableGutters={true}>
      <>
        <Header />
        <Link href={'/views/start-workday'}>
          <ArrowApp />
        </Link>
        <form onSubmit={handleSubmit}>
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
          {packages?.map((pack) => {
            return (
              <>
                <Box sx={{ display: 'flex' }}>
                  <Checkbox
                    {...label}
                    checked={selectedPackages.includes(pack._id)}
                    onChange={() => handleChange(pack._id)}
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: 28 },
                      marginLeft: '10%',
                      marginTop: '2%',
                    }}
                    color="info"
                  />
                  <Box>
                    <Typography ml={2} variant="subtitle1" className={styles.boxAddress}>
                      {pack.address}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography ml={2} variant="subtitle1" className={styles.boxAddress}>
                      {pack.weight} Kg
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ m: '5%' }} />
              </>
            );
          })}
          <Box className={styles.boxContainer}>
            <ButtonApp typeofButton="submit" variantButton="contained">
              Iniciar Jornada
            </ButtonApp>
          </Box>
        </form>
      </>
    </Container>
  );
}
