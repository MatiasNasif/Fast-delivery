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
import { useSnackbar } from 'notistack';

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
  const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;
  const { enqueueSnackbar } = useSnackbar();
  const counterPackages: number = packages.length;

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/packages/${userId}/packagesByUser`)
        .then((response) => response.json())
        .then((packs) => setPackages(packs));
    }
  }, [userId, packages]);

  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}/packages/${userId}/packagesPendingByUser`)
        .then((response) => response.json())
        .then((packs) => setPackagesPending(packs));
    }
  }, [userId, packagesPending]);

  useEffect(() => {
    dispatch(setPersistence());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getFormById(userId));
    }
  }, [dispatch, userId]);
  const messageOfalcoholYesButton = () => {
    const messageOfalcoholYes =
      'En tu declaración jurada haz seleccionado que haz bebido alcohol en las ultimas 24 horas, por lo tanto tienes denegado el acceso. Vuelve mañana por favor';

    enqueueSnackbar(`${messageOfalcoholYes}`, {
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
    });
  };

  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Header />
          {form.alcohol === 'si' ? (
            <span onClick={messageOfalcoholYesButton}>
              <ButtonApp variantButton="contained" isDisable={true}>
                {' '}
                NO PODES LABURAR POR 24 HORAS
              </ButtonApp>
            </span>
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
