import React, { useEffect, useState } from 'react';
import styles from '../../../styles/DeliveryManDetails.module.css';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import PackageDetailsCard from '@/commons/packageDetailsCard';
import DeliveryStatus from '@/utils/deliveryStatus';
import { Container, Box, Typography, Accordion, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import imageAvatar from '../../../assets/avatar1.jpeg';
import { createFalse } from 'typescript';

interface User {
  fullName: string;
  status?: string | undefined;
}

const initialUserState: User = {
  fullName: '',
  status: 'Activo',
};

interface Package {
  address: string;
  deliveryStatus: string;
  _id: string;
}

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

const DeliveryManDetails = () => {
  const [deliveryMan, setDeliveryMan] = useState<User>(initialUserState);
  const [deliveredPackages, setDeliveredPackages] = useState<Package[]>([]);
  const [pendingPackages, setPendingPackages] = useState<Package[]>([]);
  const [checkSwitchChange, setCheckSwitchChange] = useState<boolean>(true);

  const router = useRouter();

  const idDeliveryManParam: string = (router.query.id ?? '').toString();

  useEffect(() => {
    fetch(`${urlApi}/users/${idDeliveryManParam}`)
      .then((response) => response.json())
      .then((deliveryMan: User) => setDeliveryMan(deliveryMan))
      .catch((error) => console.log(error));
  }, [idDeliveryManParam]);

  useEffect(() => {
    fetch(`${urlApi}/packages/${idDeliveryManParam}/packagesByUser`)
      .then((response) => response.json())
      .then((packages: Package[]) => setDeliveredPackages(packages))
      .catch((error) => console.log(error));
  }, [idDeliveryManParam, deliveredPackages]);

  useEffect(() => {
    fetch(`${urlApi}/packages/${idDeliveryManParam}/packagesPendingByUser`)
      .then((response) => response.json())
      .then((packages: Package[]) => setPendingPackages(packages))
      .catch((error) => console.log(error));
  }, [idDeliveryManParam, pendingPackages]);

  const handleChangeSwitchButton = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckSwitchChange(event.target.checked);
    const newStatus = deliveryMan.status === 'Activo' ? 'Inactivo' : 'Activo';
    updateDeliveryManStatus(newStatus)
      .then((updatedDeliveryMan) => {
        setDeliveryMan(updatedDeliveryMan);
      })
      .catch((error) => console.error(error));
  };

  const updateDeliveryManStatus = (newStatus: string): Promise<User> => {
    return fetch(`${urlApi}/users/${idDeliveryManParam}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  let deliveredPackagesCount: number = deliveredPackages.length;

  return (
    <>
      <Header />
      <Link href={'/views/manage-delivery-man'}>
        <ArrowApp />
      </Link>
      <Container className={styles.container_all}>
        <Box className={styles.container_grid}>
          <section className={styles.container_avatar_image}>
            <Avatar className={styles.container_avatar}>
              <Image src={imageAvatar} alt="image-avatar" className={styles.image_avatar} />
            </Avatar>
          </section>
          <section className={styles.container_options_and_typography}>
            <Typography>{deliveryMan?.fullName}</Typography>
            <DeliveryStatus checkSwitchChange={deliveryMan?.status} />
          </section>
          <section className={styles.container_switch}>
            <Switch
              checked={checkSwitchChange}
              onChange={handleChangeSwitchButton}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </section>
        </Box>

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
            {pendingPackages.length > 0 &&
              pendingPackages.map((pendingPackage: Package, i: number) => (
                <PackageDetailsCard key={i} packageDetail={pendingPackage} />
              ))}
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
                Historial de repartos
              </Typography>
            </AccordionSummary>
            <Typography className={styles.subtitle} variant="subtitle1">
              Ya repartiste {deliveredPackagesCount}
            </Typography>
            {deliveredPackages.length > 0 &&
              deliveredPackages.map((deliveredPackage: Package, i: number) => (
                <PackageDetailsCard key={i} packageDetail={deliveredPackage} />
              ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
};

export default DeliveryManDetails;
