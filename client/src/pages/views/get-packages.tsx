import { Container, Box, Typography, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useCallback, useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import styles from '../../styles/GetPackages.module.css';
import Header from '../../commons/header';
import ButtonApp from '../../commons/buttonApp';
import ArrowApp from '../../commons/arrowApp';
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Package {
  weight: number;
  address: string;
  _id: string;
}

interface User {
  admin?: boolean;
}

export default function GetPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
  const userId = user.id;

  const countPackages = packages?.length > 0;

  const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

  const navigate = useRouter();

  if (user.admin === true) {
    navigate.push('/views/manage-schedule');
  }

  const fetchPackages = useCallback(() => {
    fetch(`${API_URL}/packages/packagesPendingNotAssign`)
      .then((response) => response.json())
      .then((packages) => setPackages(packages))
      .catch((error) => console.error(error));
  }, [API_URL]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

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

  const updateDeliveryStatus = (): void => {
    selectedPackages?.map((pack) => {
      fetch(`${API_URL}/packages/${pack}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryStatus: 'En curso',
        }),
      });
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        .then(() => updateDeliveryStatus())
        .then(() => navigate.push(`start-workday`))
        .catch((error) => {
          navigate.push(`start-workday`);
          console.error(error);
        });
    }
  };

  return (
    <Container maxWidth={'xs'} disableGutters={true}>
      <>
        <Header
          onClickedLogout={() => setIsLoading(true)}
          onClickedProfile={() => setIsLoading(true)}
        />
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
          {countPackages ? (
            packages.map((pack, i) => (
              <>
                <Box sx={{ display: 'flex' }} key={i}>
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
            ))
          ) : (
            <Box>
              <Typography className={styles.noPackages}>No hay paquetes disponibles</Typography>
            </Box>
          )}
          <Box className={styles.boxContainer}>
            {countPackages ? (
              <ButtonApp typeofButton="submit" variantButton="contained" isDisable={false}>
                Iniciar Jornada
              </ButtonApp>
            ) : (
              <ButtonApp typeofButton="submit" variantButton="contained" isDisable={true}>
                Iniciar Jornada
              </ButtonApp>
            )}
          </Box>
        </form>
      </>
    </Container>
  );
}
