import { Box, Accordion, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/StartWorkday.module.css';
import Header from '../../commons/header';
import Card from '../../commons/card';
import ButtonApp from '../../commons/buttonApp';
import Link from 'next/link';
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
  const [packagesDelivered, setPackagesDelivered] = useState<Package[]>([]);

  let user: User | null = null;
  if (typeof window !== 'undefined') {
    const userLocalStorage = localStorage.getItem('user');
    user = userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
  }

  const userId = user?.id;

  useEffect(() => {
    if (userId) requestPackagesAll();
  }, [userId]);

  const API_URL = 'http://localhost:5000';
  const counterPackagesDelivered: number = packagesDelivered.length;

  const requestPackagesAll = () => {
    fetch(`${API_URL}/packages/${userId}/packagesByUser`)
      .then((response) => response.json())
      .then((packs) => {
        const packsDelivered = packs.filter(
          (pack: Package) =>
            pack.deliveryStatus === 'Entregado' || pack.deliveryStatus === 'En curso'
        );
        setPackagesDelivered(packsDelivered);

        const packsPending = packs.filter((pack: Package) => pack.deliveryStatus === 'Pendiente');
        setPackagesPending(packsPending);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Header />
          <Link href="/views/get-packages">
            <ButtonApp isDisable={false}>obtener paquetes</ButtonApp>
          </Link>

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
                packagesPending.map((dummy: any, i: number) => <Card key={i} dummy={dummy} />)
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

              {counterPackagesDelivered !== 0 ? (
                <Typography className={styles.subtitle} variant="subtitle1">
                  Ya repartiste {counterPackagesDelivered} paquetes
                </Typography>
              ) : (
                <Typography className={styles.subtitle} variant="subtitle1">
                  Nada en el historial de repartos
                </Typography>
              )}
              {packagesDelivered.map((dummy: any, i: number) => (
                <Card key={i} dummy={dummy} />
              ))}
            </Accordion>
          </Box>
        </Container>
      </main>
    </>
  );
}
