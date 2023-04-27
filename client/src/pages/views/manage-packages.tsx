import { Box, Accordion, AccordionSummary, Container, Typography, Fab } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import React, { useCallback } from 'react';
import Link from 'next/link';
import ArrowApp from '@/commons/arrowApp';
import styles from '../../styles/Manage-packages.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

const ManagePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  let user: User | null = null;
  if (typeof window !== 'undefined') {
    const userLocalStorage = localStorage.getItem('user');
    user = userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
  }

  const today = new Date();
  const day: string = today.getDate().toString().padStart(2, '0');
  const month: string = (today.getMonth() + 1).toString();
  const year: string = today.getFullYear().toString().slice(-2);
  const dateFormatted: string = `${day}-${month}-${year}`;

  const dateSelected = useSelector((state) => state.date);

  const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

  const countPackages = packages.length;

  const fetchPackages = useCallback(() => {
    dateSelected === '' || dateSelected === undefined
      ? fetch(`${API_URL}/packages/${dateFormatted}/delivery-date`)
          .then((response) => response.json())
          .then((packs) => setPackages(packs))
      : fetch(`${API_URL}/packages/${dateSelected}/delivery-date`)
          .then((response) => response.json())
          .then((packs) => setPackages(packs));
  }, [dateSelected]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return (
    <>
      <Container className={styles.containerManagePackages} maxWidth="xs" disableGutters={true}>
        <Header />
        <Link href={'/views/manage-schedule'}>
          <ArrowApp />
        </Link>
        <Box className={styles.box}>
          <Accordion defaultExpanded>
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
            {packages && packages.length > 0
              ? packages.map((pack: Package, i: number) => {
                  return <Card key={i} packageDetail={pack} onDeletePackage={fetchPackages} />;
                })
              : null}
          </Accordion>
        </Box>
        <Box className={styles.addIconContainer}>
          <Fab color="primary" aria-label="add">
            <Link href={'/views/add-package'}>
              <AddIcon className={styles.addIcon} />
            </Link>
          </Fab>
        </Box>
      </Container>
    </>
  );
};

export default ManagePackages;
