import { Box, Accordion, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/StartWorkday.module.css';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import ButtonApp from '../../commons/buttonApp';
import { useEffect, useState } from 'react';

interface Package {
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  user?: string;
}

interface User {
  email: string;
  id: string;
}

export default function StartWorkday() {
  const [packagesPending, setPackagesPending] = useState<Package[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  let user: User | null = null;
  if (typeof window !== 'undefined') {
    const userLocalStorage = localStorage.getItem('user');
    user = userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
  }

  const userId = user?.id;

  const API_URL = 'http://localhost:5000';
  const counterPackages: number = packages.length;

  useEffect(() => {
    fetch(`${API_URL}/packages/${userId}/packagesByUser`)
      .then((response) => response.json())
      .then((packs) => setPackages(packs));
  }, [userId, packages]);

  useEffect(() => {
    fetch(`${API_URL}/packages/${userId}/packagesPendingByUser`)
      .then((response) => response.json())
      .then((packs) => setPackagesPending(packs));
  }, [userId, packagesPending]);

  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Header />

          {/* <Link href="/views/get-packages">
              <ButtonApp variantButton="contained">obtener paquetes</ButtonApp>{' '}
            </Link> */}

          <ButtonApp variantButton="contained" isDisable={true}>
            {' '}
            NO PODES LABURAR
          </ButtonApp>

          <Box className={styles.box}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className={styles.title}>
                  Repartos pendientes
                </Typography>
              </AccordionSummary>
              {packagesPending.length > 0 ? (
                packagesPending.map((pendingPackage: Package, i: number) => (
                  <Card key={i} packageDetail={pendingPackage} />
                ))
              ) : (
                <Typography variant="subtitle1" className={styles.subtitle}>
                  No tenés repartos pendientes
                </Typography>
              )}{' '}
            </Accordion>
          </Box>

          <Box className={styles.box}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className={styles.title}>
                  Historial de Repartos
                </Typography>
              </AccordionSummary>

              {counterPackages !== 0 ? (
                <Typography className={styles.subtitle} variant="subtitle1">
                  Ya repartiste {counterPackages} paquetes
                </Typography>
              ) : (
                <Typography className={styles.subtitle} variant="subtitle1">
                  Nada en el historial de repartos
                </Typography>
              )}
              {packages.map((pack: Package, i: number) => (
                <Card key={i} packageDetail={pack} />
              ))}
            </Accordion>
          </Box>
        </Container>
      </main>
    </>
  );
}
