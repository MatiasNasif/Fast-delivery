import React, { useEffect, useState } from 'react';
import styles from '../../../styles/DeliveryManDetails.module.css';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import Card from '@/commons/card';
import { Container, Box, Typography, Accordion, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import SwitchOnOff from '../../../utils/switchOnOff';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import imageAvatar from '../../../assets/avatar1.jpeg';

interface User {
  fullName: string;
  status?: 'Activo' | 'Inactivo';
}

const initialUserState: User = {
  fullName: '',
  status: 'Activo',
};

interface Package {
  address: string;
  deliveryStatus: string;
}

const DeliveryManDetails = () => {
  const [deliveryMan, setDeliveryMan] = useState<User>(initialUserState);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesPendig, setPackagesPendig] = useState<Package[]>([]);
  const [checked, setChecked] = useState(true);

  const router = useRouter();
  // const idDeliveryManParam = router.query.id;
  const idDeliveryManParam = '642360135795abfd3f5be2f1';

  useEffect(() => {
    fetch(`http://localhost:5000/users/${idDeliveryManParam}`)
      .then((response) => response.json())
      .then((deliveryMan) => setDeliveryMan(deliveryMan))
      .catch((error) => console.log(error));
  }, [router.query.id]);

  useEffect(() => {
    fetch(`http://localhost:5000/packages/${idDeliveryManParam}/packagesByUser`)
      .then((response) => response.json())
      .then((packages) => setPackages(packages))
      .catch((error) => console.log(error));
  }, [router.query.id]);

  useEffect(() => {
    fetch(`http://localhost:5000/packages/${idDeliveryManParam}/packagesPendingByUser`)
      .then((response) => response.json())
      .then((packages) => setPackagesPendig(packages))
      .catch((error) => console.log(error));
  }, [router.query.id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  let contPackages = packages.length;

  return (
    <>
      <Header />
      <Link href={'/views/manage-delivery-man'}>
        <ArrowApp />
      </Link>
      <Container className={styles.container_all}>
        <Box className={styles.container_grid}>
          <div className={styles.container_avatar_image}>
            <Avatar className={styles.container_avatar}>
              <Image src={imageAvatar} alt="image-avatar" className={styles.image_avatar} />
            </Avatar>
          </div>
          <div className={styles.container_options_and_typography}>
            <Typography>{deliveryMan?.fullName}</Typography>
            <SwitchOnOff checked={checked} />
          </div>
          <div className={styles.container_switch}>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
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
            {packagesPendig.map((dummy: any, i: number) => (
              <Card key={i} dummy={dummy} />
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
              Ya repartiste {contPackages}
            </Typography>
            {packages.map((dummy: any, i: number) => (
              <Card key={i} dummy={dummy} />
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
};

export default DeliveryManDetails;
