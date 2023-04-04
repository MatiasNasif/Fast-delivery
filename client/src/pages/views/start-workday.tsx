import { Box, Accordion, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/StartWorkday.module.css';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import ButtonApp from '../../commons/buttonApp';
import Link from 'next/link';
import { Package, requestPackages } from '@/utils/fakerPackages';
import { useEffect, useState } from 'react';

export default function StartWorkday() {
  const [packagesPending, setPackagesPending] = useState<Package[]>([]);
  const [packagesDelivered, setPackagesDelivered] = useState<Package[]>([]);

  useEffect(() => {
    requestPackagesAll();
  }, []);

  const counterPackagesDelivered: number = packagesDelivered.length;

  const requestPackagesAll = () => {
    requestPackages(5).then((packs) => {
      const packsDelivered = packs.filter((packs) => {
        return packs.deliveryStatus == 'Entregado' || packs.deliveryStatus == 'En curso'
          ? packs
          : null;
      });
      setPackagesDelivered(packsDelivered);
      const packsPending = packs.filter((packs) => {
        return packs.deliveryStatus == 'Pendiente' ? packs : null;
      });
      setPackagesPending(packsPending);
    });
  };

  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Header />
          <Link href="/views/get-packages">
            <ButtonApp>obtener paquetes</ButtonApp>
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
