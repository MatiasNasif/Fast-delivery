import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../../styles/DeliveryManDetails.module.css';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import PackageDetailsCard from '@/commons/packageDetailsCard';
import DeliveryStatus from '@/utils/deliveryStatus';
import { Container, Box, Typography, Accordion, AccordionSummary } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface User {
  fullName: string;
  status?: string | undefined;
  admin: boolean;
}

const initialUserState: User = {
  fullName: '',
  status: 'Activo',
  admin: true,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkSwitchChange, setCheckSwitchChange] = useState<boolean>(
    deliveryMan.status !== 'Activo' ? false : true
  );

  const router = useRouter();
  const idDeliveryManParam: string = (router.query.id ?? '').toString();

  const user: User =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');

  if (user.admin === false) {
    router.push('/views/start-workday');
  }

  useEffect(() => {
    fetch(`${urlApi}/users/${idDeliveryManParam}`)
      .then((response) => response.json())
      .then((deliveryMan: User) => setDeliveryMan(deliveryMan))
      .catch((error) => console.log(error));
  }, []);

  const fetchPackages = useCallback(() => {
    fetch(`${urlApi}/packages/${idDeliveryManParam}/packagesByUser`)
      .then((response) => response.json())
      .then((packages: Package[]) => setDeliveredPackages(packages))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const fetchPackagesPending = useCallback(() => {
    fetch(`${urlApi}/packages/${idDeliveryManParam}/packagesPendingByUser`)
      .then((response) => response.json())
      .then((packages: Package[]) => setPendingPackages(packages))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchPackagesPending();
  }, [fetchPackagesPending]);

  const handleChangeSwitchButton = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckSwitchChange(event.target.checked);
    const newStatus = deliveryMan.status === 'Activo' ? 'Inactivo' : 'Activo';
    updateDeliveryManStatus(newStatus)
      .then((updatedDeliveryMan) => {
        setDeliveryMan(updatedDeliveryMan);
      })
      .catch((error) => {
        console.error(error);
        setCheckSwitchChange(!event.target.checked);
      });
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
      <Header
        onClickedLogout={() => setIsLoading(true)}
        onClickedProfile={() => setIsLoading(true)}
      />
      <Link href={'/views/manage-delivery-man'}>
        <ArrowApp />
      </Link>
      <Container className={styles.container_all}>
        <Box className={styles.container_grid}>
          <section className={styles.container_avatar_image}>
            <Avatar src={deliveryMan?.photo} className={styles.container_avatar}></Avatar>
          </section>
          <section className={styles.container_options_and_typography}>
            <Typography className={styles.typography_name}>{deliveryMan?.fullName}</Typography>
            <DeliveryStatus checkSwitchChange={deliveryMan?.status} />
          </section>

          <section className={styles.container_switch}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={deliveryMan.status === 'Activo' ? true : false}
                onChange={handleChangeSwitchButton}
              />
              <span className={styles.slider}></span>
            </label>
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
                <PackageDetailsCard
                  key={i}
                  packageDetail={pendingPackage}
                  onDeletePackage={fetchPackagesPending}
                />
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
                <PackageDetailsCard
                  key={i}
                  packageDetail={deliveredPackage}
                  onDeletePackage={fetchPackages}
                />
              ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
};
export default DeliveryManDetails;
