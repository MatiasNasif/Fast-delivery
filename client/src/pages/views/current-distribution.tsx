import { useEffect, useState } from 'react';
import styles from '../../styles/CurrentDistribution.module.css';
import GoogleMaps from '../../components/google-maps';
import ArrowApp from '@/commons/arrowApp';
import Header from '@/commons/header';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  user?: string;
  _id?: string;
}

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export default function CurrentDistribution() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const packageIdSelected = useSelector((state) => state.package);
  const [packageByUser, setPackageByUser] = useState<Package>();

  useEffect(() => {
    fetch(`${urlApi}/packages/${packageIdSelected}`)
      .then((response) => response.json())
      .then((packageByUser: Package) => setPackageByUser(packageByUser))
      .catch((error) => console.log(error));
  }, []);

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
      .then(() => navigate.push('start-workday'))
      .catch((error) => console.error(error));
  };

  return (
    <Container maxWidth="xs" disableGutters={true}>
      <Header />
      <Link href={'/views/start-workday'}>
        <ArrowApp />
      </Link>

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
            {packageByUser?.deliveryStatus != 'Entregado' ? (
              <Button
                className={styles.button}
                variant="contained"
                onClick={() =>
                  handleUpdatePackageStatus(packageByUser?._id, packageByUser?.deliveryStatus)
                }
              >
                Finalizar
              </Button>
            ) : (
              <Button className={styles.button} variant="contained" disabled={true}>
                Finalizado
              </Button>
            )}
          </section>
        </Accordion>
      </section>
    </Container>
  );
}
