import React, { useEffect, useState } from 'react';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import Card from '@/commons/card';
import { Container, Box, Typography, Accordion, AccordionSummary } from '@mui/material';
import styles from '../../styles/DeliveryManDetails.module.css';
import { DeliveryMan, requestDeliveryMen } from '@/utils/fakerDeliveryMen';
import { Package, requestPackages } from '@/utils/fakerPackages';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import imageAvatar from '../../assets/avatar1.jpeg';
import Switch from '@mui/material/Switch';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SwitchOnOff from '../../utils/switchOnOff';

const DeliveryManDetails = () => {
  const [deliveryMans, setDeliveryMans] = useState<DeliveryMan[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packagesPendig, setPackagesPendig] = useState<Package[]>([]);

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    requestDeliveryMen(1).then((deliveryMan) => {
      setDeliveryMans(deliveryMan);
    });
  }, []);

  useEffect(() => {
    requestPackagesAll();
  }, []);

  const requestPackagesAll = () => {
    requestPackages(10).then((packs) => {
      const packsDelivered = packs.filter((packs) => {
        return packs.deliveryStatus == 'Entregado' ? packs : null;
      });
      setPackages(packsDelivered);
      const packsPending = packs.filter((packs) => {
        return packs.deliveryStatus == 'Pendiente' ? packs : null;
      });
      setPackagesPendig(packsPending);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  let contPackages = packages.length;

  return (
    <>
      <Header />
      <ArrowApp />
      <Container className={styles.container_all}>
        <Box className={styles.container_grid}>
          {deliveryMans?.map((deliveryMan: any, i: number) => (
            <>
              <div className={styles.container_avatar_image}>
                <Avatar className={styles.container_avatar}>
                  <Image src={imageAvatar} alt="image-avatar" className={styles.image_avatar} />
                </Avatar>
              </div>
              <div className={styles.container_options_and_typography}>
                <Typography>{deliveryMan.fullName}</Typography>
                <SwitchOnOff checked={checked} />
              </div>
              <div className={styles.container_switch}>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </>
          ))}
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
