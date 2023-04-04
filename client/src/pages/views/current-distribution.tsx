import { useEffect, useState } from 'react';
import styles from '../../styles/CurrentDistribution.module.css';
import maps from '../../assets/maps.png';
import ArrowApp from '@/commons/arrowApp';
import Header from '@/commons/header';
import Link from 'next/link';
import Image from 'next/image';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

interface User {
  id: string;
}

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

export default function CurrentDistribution() {
  let user: User | null = null;
  if (typeof window !== 'undefined') {
    const userLocalStorage: string | null = localStorage.getItem('user');
    user = userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
  }

  const userId: string | undefined = user?.id;
  const API_URL: string = 'http://localhost:5000';

  const [packagesByUser, setPackagesByUser] = useState<Package[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/packages/${userId}/packagesByUser`)
      .then((response) => response.json())
      .then((packagesByUser: Package[]) => setPackagesByUser(packagesByUser))
      .catch((error) => console.log(error));
  }, [userId, packagesByUser]);

  const handleUpdatePackageStatus = (
    packageId: string | undefined,
    packageStatus: string
  ): void => {
    const packageDeliveryStatus = packageStatus == 'En curso' ? 'Entregado' : 'En curso';
    fetch(`${API_URL}/packages/${packageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deliveryStatus: packageDeliveryStatus }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  return (
    <Container maxWidth="xs" disableGutters={true}>
      <Header />
      <Link href={'/views/get-packages'}>
        <ArrowApp />
      </Link>

      <section className={styles.container_accordion}>
        {packagesByUser?.map((packByUser: Package, i: number) => (
          <Accordion key={i} className={styles.accordion_space}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" className={styles.container_accordion_title}>
                {`Reparto ${packByUser.deliveryStatus}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <section>
                <Image src={maps} alt="maps" className={styles.container_accordion_maps} />
              </section>
              <section>
                <Typography className={styles.container_accordion_subtitle}>
                  Destino:{' '}
                  <span className={styles.container_accordion_subtitle_details}>
                    {packByUser.address}
                  </span>
                </Typography>
                <Typography className={styles.container_accordion_subtitle}>
                  # del paquete:{' '}
                  <span className={styles.container_accordion_subtitle_details}>
                    {packByUser._id}
                  </span>
                </Typography>
                <Typography className={styles.container_accordion_subtitle}>
                  Recibe:{' '}
                  <span className={styles.container_accordion_subtitle_details}>
                    {packByUser.receiver}
                  </span>
                </Typography>
              </section>
            </AccordionDetails>
            <section className={styles.container_button}>
              {packByUser.deliveryStatus != 'Entregado' ? (
                <Button
                  className={styles.button}
                  variant="contained"
                  onClick={() =>
                    handleUpdatePackageStatus(packByUser._id, packByUser.deliveryStatus)
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
        ))}
      </section>
    </Container>
  );
}
