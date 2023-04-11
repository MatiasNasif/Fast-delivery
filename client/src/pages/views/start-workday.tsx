import { Box, Accordion, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/StartWorkday.module.css';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import ButtonApp from '../../commons/buttonApp';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPersistence } from '@/store/user';
import { getFormById } from '@/store/formSworn';

interface Package {
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  user?: string;
}

interface userRedux {
  email: string;
  id: string;
}

export default function StartWorkday() {
  const [packagesPending, setPackagesPending] = useState<Package[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const userRedux = useSelector((state) => state.user);
  const userId = userRedux.id;
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
      
    dispatch(setPersistence());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getFormById(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Header />
          {form.alcohol === 'si' ? (
            <ButtonApp variantButton="contained" isDisable={true}>
              {' '}
              NO PODES LABURAR POR 24 HORAS
            </ButtonApp>
          ) : (
            <Link href="/views/get-packages">
              <ButtonApp variantButton="contained">obtener paquetes</ButtonApp>{' '}
            </Link>
          )}

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
