import {
  Box,
  Container,
  Button,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AvatarGroup,
} from '@mui/material';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import styles from '../../styles/Schedule.module.css';
import Header from '@/commons/header';
import Calendar from '../../commons/day';
import Progress from '../../commons/progress';
import CircleDummy from '../../dummy-data/Circular-Progress.json';
import PackageDummy from '../../dummy-data/package-progress.json';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

interface User {
  status: string | undefined;
  avatar?: string;
  id?: string;
  fullName?: string;
}

interface Package {
  deliveryStatus: string;
}

export default function ManageSchedule() {
  const today = new Date();
  const day: string = today.getDate().toString().padStart(2, '0');
  const month: string = (today.getMonth() + 1).toString();
  const year: string = today.getFullYear().toString().slice(-2);
  const dateFormatted: string = `${day}-${month}-${year}`;

  const [deliveryMans, setDeliveryMans] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(dateFormatted);

  useEffect(() => {
    fetch(`${urlApi}/users/alldeliveryman`)
      .then((response) => response.json())
      .then((deliveryMans: User[]) => setDeliveryMans(deliveryMans))
      .catch((error) => console.log(error));
  }, [deliveryMans]);

  useEffect(() => {
    fetch(`${urlApi}/packages/${dateFormatted}/delivery-date`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((packageByDate: Package[]) => {
        setPackages(packageByDate);
      })
      .catch((error) => console.log(error));
  }, [dateFormatted]);

  const updatePackagesByDate = (newPackages: Package[], date: string): void => {
    if (Array.isArray(newPackages)) {
      setPackages(newPackages);
      setSelectedDate(date);
    }
  };

  const activeDeliveryManCounter: number = (deliveryMans || []).filter(
    (user) => user.status === 'Activo'
  ).length;

  const inactiveDeliveryManCounter: number = (deliveryMans || []).filter(
    (user) => user.status === 'Inactivo'
  ).length;

  const totalDeliveryManCounter: number = activeDeliveryManCounter + inactiveDeliveryManCounter;

  const activeDeliveryManPercentage: number =
    (activeDeliveryManCounter / totalDeliveryManCounter) * 100;

  const deliveredPackages: number = (packages || []).filter(
    (pkg) => pkg.deliveryStatus === 'Entregado'
  ).length;

  const pendingPackages: number = (packages || []).filter(
    (pkg) => pkg.deliveryStatus === 'En curso' || pkg.deliveryStatus === 'Pendiente'
  ).length;

  const totalPackages: number = deliveredPackages + pendingPackages;

  let deliveredPackagesPercentage: number;

  if (deliveredPackages === 0 && totalPackages === 0) {
    deliveredPackagesPercentage = 0;
  } else {
    deliveredPackagesPercentage = (deliveredPackages / totalPackages) * 100;
  }

  return (
    <>
      <Header />
      <Container disableGutters={true} className={styles.containerManage}>
        <Box className={styles.boxAdmin}>
          <Avatar alt="Admin" />
          <Box>
            <Typography className={styles.helloAdmin} variant="inherit" color="black">
              Hola admin !
            </Typography>
            <Typography className={styles.textOfmanage} variant="inherit" color="black">
              Gestionar Pedidos
            </Typography>
          </Box>
        </Box>
        <Calendar updatePackagesByDate={updatePackagesByDate} />
        <Box mt={2}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ArrowDropDownSharpIcon />}
              aria-controls="panel1a-content"
            >
              <Typography className={styles.textOfdetails} variant="inherit">
                {selectedDate} - Detalles
              </Typography>
            </AccordionSummary>
            {CircleDummy.map((data, i) => (
              <Box key={i}>
                <Box className={styles.boxOfdeliveryman}>
                  <Progress value={activeDeliveryManPercentage} />
                  <Box sx={{ width: '100%' }}>
                    <Typography className={styles.textOfdeliveryman} variant="inherit">
                      Repartidores
                    </Typography>
                    <Typography className={styles.textOfstatus} variant="inherit">
                      {`${activeDeliveryManCounter}/${totalDeliveryManCounter}`} Activos
                    </Typography>
                  </Box>
                  <AvatarGroup max={2} sx={{ marginLeft: 'auto', marginRight: '20px' }}>
                    <Avatar alt="Remy Sharp" />
                    <Avatar alt="Travis Howard" />
                  </AvatarGroup>
                </Box>
                <Box className={styles.boxBtn}>
                  <Box mt={2} px={2}>
                    <Link href={'/views/manage-delivery-man'}>
                      <Button fullWidth variant="contained" size="small">
                        Ver Repartidores
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            ))}
            {PackageDummy.map((data, i) => (
              <Box key={i}>
                <Box className={styles.boxOfpackages}>
                  <Progress value={deliveredPackagesPercentage} />
                  <Box sx={{ width: '100%' }}>
                    <Typography className={styles.textOfdeliveryman} variant="inherit">
                      Paquetes
                    </Typography>

                    <Typography className={styles.textOfstatus} variant="inherit">
                      {`${deliveredPackages}/${totalPackages}`} Repartidos
                    </Typography>
                  </Box>{' '}
                </Box>

                <Box className={styles.boxBtn}>
                  <Box mt={2} px={2}>
                    <Link href={'/views/manage-packages'}>
                      <Button fullWidth variant="contained" size="small" className={styles.box}>
                        Ver Paquetes
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
