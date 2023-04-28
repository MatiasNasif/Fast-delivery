import { useCallback, useEffect, useState } from 'react';
import styles from '../../../styles/CurrentDistribution.module.css';
import GoogleMaps from '../../../components/google-maps';
import ArrowApp from '@/commons/arrowApp';
import Header from '@/commons/header';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

interface Package {
  address: string;
  receiver: string;
  weight?: number;
  deliveryDate?: string;
  quantity?: number;
  deliveryStatus: string;
  user?: string;
  _id?: string;
}

const initialPackage: Package = {
  deliveryStatus: '',
  address: '',
  receiver: '',
  _id: '',
};

interface User {
  status: string;
}

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export default function CurrentDistribution() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const packageIdSelected: string = (navigate.query.id ?? '').toString();
  const [packageByUser, setPackageByUser] = useState<Package>(initialPackage);

  const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
  const userId = user.id;

  const fetchPackage = useCallback(() => {
    fetch(`${urlApi}/packages/${packageIdSelected}`)
      .then((response) => response.json())
      .then((packageByUser: Package) => setPackageByUser(packageByUser))
      .catch((error) => console.log(error));
  }, [packageIdSelected]);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  const handleUpdatePackageStatus = (
    packageId: string | undefined,
    packageStatus: string | undefined
  ): void => {
    const packageDeliveryStatus = packageStatus == 'En curso' ? 'Entregado' : 'En curso';
    fetch(`${urlApi}/packages/${packageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deliveryStatus: packageDeliveryStatus }),
    })
      .then((response) => response.json())
      .then(() =>
        enqueueSnackbar(`Paquete entregado`, {
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
        })
      )
      .then(() => navigate.push('/views/start-workday'))
      .catch((error) => console.error(error));
  };

  return (
    <Container
      className={styles.current_distribution_container}
      maxWidth="xs"
      disableGutters={true}
    >
      <Header
        onClickedLogout={() => setIsLoading(true)}
        onClickedProfile={() => setIsLoading(true)}
      />
      <Link href={'/views/start-workday'}>
        <ArrowApp />
      </Link>
      {user?.status === 'Inactivo' ? (
        <>
          <Typography variant="h6" className={styles.user_blocked}>
            Usuario Bloqueado
          </Typography>
          <Typography variant="h6" className={styles.user_blocked}>
            No podrá seguir repartiendo paquetes
          </Typography>
        </>
      ) : null}
      {packageByUser?.deliveryStatus === undefined || packageByUser?.deliveryStatus === '' ? (
        <h1 className={styles.loading}>cargando...</h1>
      ) : (
        <section className={styles.container_accordion}>
          <Accordion className={styles.accordion_space}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" className={styles.container_accordion_title}>
                {`Reparto ${packageByUser?.deliveryStatus}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <section>
                <GoogleMaps destination={packageByUser?.address} />
              </section>
              <section>
                <Typography className={styles.container_accordion_subtitle}>
                  Destino:{' '}
                  <span className={styles.container_accordion_subtitle_details}>
                    {packageByUser?.address}
                  </span>
                </Typography>
                <Typography className={styles.container_accordion_subtitle}>
                  # del paquete:{' '}
                  <span className={styles.container_accordion_subtitle_details}>
                    {packageByUser?._id}
                  </span>
                </Typography>
                <Typography className={styles.container_accordion_subtitle}>
                  Recibe:{' '}
                  <span className={styles.container_accordion_subtitle_details}>
                    {packageByUser?.receiver}
                  </span>
                </Typography>
              </section>
            </AccordionDetails>
            <section className={styles.container_button}>
              {packageByUser?.deliveryStatus === 'Entregado' || user?.status === 'Inactivo' ? (
                <Button className={styles.button} variant="contained" disabled={true}>
                  Finalizado
                </Button>
              ) : (
                <Button
                  className={styles.button}
                  variant="contained"
                  onClick={() =>
                    handleUpdatePackageStatus(packageByUser?._id, packageByUser?.deliveryStatus)
                  }
                >
                  Finalizar
                </Button>
              )}
            </section>
          </Accordion>
        </section>
      )}
    </Container>
  );
}
