import { Box, Accordion, AccordionSummary, Container, Typography, Fab } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import React from 'react';
import Link from 'next/link';
import ArrowApp from '@/commons/arrowApp';
import styles from '../../styles/Manage-packages.module.css';
import { useState, useEffect } from 'react';

interface User {
  email: string;
  id: string;
}

interface Package {
  _id?: string;
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  user?: string;
}

export default function ManagePackages() {
  const [packagesPending, setPackagesPending] = useState<Package[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  let user: User | null = null;
  if (typeof window !== 'undefined') {
    const userLocalStorage = localStorage.getItem('user');
    user = userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
  }

  const userId = user?.id;
  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/packages/${userId}/packagesByUser`)
      .then((response) => response.json())
      .then((packs) => setPackages(packs));
  }, [userId]);

  useEffect(() => {
    fetch(`${API_URL}/packages/${userId}/packagesPendingByUser`)
      .then((response) => response.json())
      .then((packs) => setPackagesPending(packs));
  }, [userId]);

  let countPackages = packages.length + packagesPending.length;

  return (
    <>
      <Header />
      <Link href={'/views/manage-schedule'}>
        <ArrowApp />
      </Link>
      <Container maxWidth="xs" disableGutters={true}>
        <Box className={styles.box}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" className={styles.title}>
                Paquetes
              </Typography>
            </AccordionSummary>
            <Typography className={styles.subtitle} variant="subtitle1">
              Hay {countPackages} paquetes con el criterio de filtrado seleccionado.
            </Typography>
            {packages.map((pack: Package, i: number) => {
              if (pack.deliveryStatus) {
                return <Card key={i} packageDetail={pack} hideDeliveryStatus />;
              }
            })}
            {packagesPending.map((pack: Package, i: number) => {
              if (pack.deliveryStatus) {
                return <Card key={i} packageDetail={pack} hideDeliveryStatus />;
              }
            })}
          </Accordion>
        </Box>
        <Box className={styles.addIconContainer}>
          <Fab color="primary" aria-label="add">
            <Link href={'/views/add-package'}>
              <AddIcon />
            </Link>
          </Fab>
        </Box>
      </Container>
    </>
  );
}
