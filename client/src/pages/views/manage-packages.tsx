import { Box, Accordion, AccordionSummary, Container, Typography, Fab } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../commons/header';
import Card from '../../commons/packageDetailsCard';
import React from 'react';
import Link from 'next/link';
import ArrowApp from '@/commons/arrowApp';
import styles from '../../styles/Manage-packages.module.css';
import { Package, requestPackages } from '@/utils/fakerPackages';
import { useState, useEffect } from 'react';

export default function ManagePackages() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    requestPackagesAll();
  }, []);

  const requestPackagesAll = () => {
    requestPackages(3).then((pack) => setPackages(pack));
  };

  let countPackages = packages.length;

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
              Ya repartiste {countPackages} paquetes.
            </Typography>
            {packages.map((dummy: any, i: number) => {
              if (dummy.deliveryStatus) {
                return <Card key={i} dummy={dummy} hideDeliveryStatus />;
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
