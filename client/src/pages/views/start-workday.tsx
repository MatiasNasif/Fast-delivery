import { Box, Accordion, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/StartWorkday.module.css';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import ButtonApp from '../../commons/buttonApp';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFormById } from '@/store/formSworn';
import { useCallback } from 'react';
import { useAlert } from '@/hook/Alerthook';
import { useRouter } from 'next/router';
import Spinner from '@/commons/Spinner';

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

interface User {
  admin: boolean;
}

export default function StartWorkday() {
  const [packagesPending, setPackagesPending] = useState<Package[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const showAlert = useAlert();
  const form = useSelector((state) => state.form);
  const router = useRouter();

  const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');

  if (user.admin === true) {
    router.push('/views/manage-schedule');
  }

  const userId = user.id;
  const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;
  const counterPackages: number = packages.length;

  function AlertLogin() {
    return showAlert(
      {
        message: `Bienvenido/a ${user.fullName}`,
        typeAlert: 'success',
        showCloseButton: true,
      },
      { autoHideDuration: 3000 }
    );
  }

  useEffect(() => {
    const userLoggedInBefore = localStorage.getItem('userLoggedInBefore');
    if (!userLoggedInBefore) {
      AlertLogin();
      localStorage.setItem('userLoggedInBefore', true);
    }
  }, []);

  const fetchpackagesByUser = useCallback(() => {
    if (userId) {
      fetch(`${API_URL}/packages/${userId}/packagesByUser`)
        .then((response) => response.json())
        .then((packs) => setPackages(packs));
    }
  }, []);

  useEffect(() => {
    fetchpackagesByUser();
  }, [fetchpackagesByUser]);

  const fetchPackagesPendingByUser = useCallback(() => {
    if (userId) {
      fetch(`${API_URL}/packages/${userId}/packagesPendingByUser`)
        .then((response) => response.json())
        .then((packs) => setPackagesPending(packs));
    }
  }, []);

  useEffect(() => {
    fetchPackagesPendingByUser();
  }, [fetchPackagesPendingByUser]);

  useEffect(() => {
    if (userId) {
      dispatch(getFormById(userId));
    }
  }, [dispatch, userId]);
  const messageOfalcoholYesButton = () => {
    const messageOfalcoholYes =
      'En tu declaración jurada haz seleccionado que haz bebido alcohol en las ultimas 24 horas, por lo tanto tienes denegado el acceso. Vuelve mañana por favor';
    showAlert(
      {
        message: `${messageOfalcoholYes}`,
        typeAlert: 'info',
        showCloseButton: true,
      },
      { autoHideDuration: 3000 }
    );
  };

  return (
    <>
      {' '}
      {isLoading ? (
        <Spinner />
      ) : (
        <main>
          <Container className={styles.containerStartWorkday} maxWidth="xs" disableGutters={true}>
            <Header
              onClickedLogout={() => setIsLoading(true)}
              onClickedProfile={() => setIsLoading(true)}
            />
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
                    <Card
                      key={i}
                      packageDetail={pendingPackage}
                      onDeletePackage={fetchPackagesPendingByUser}
                    />
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
                  <Card key={i} packageDetail={pack} onDeletePackage={fetchpackagesByUser} />
                ))}
              </Accordion>
            </Box>
          </Container>
        </main>
      )}
    </>
  );
}
