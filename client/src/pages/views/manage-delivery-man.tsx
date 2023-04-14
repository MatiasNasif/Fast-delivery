import { Box, Container, Accordion, AccordionSummary, Typography, Avatar } from '@mui/material';
import Header from '../../commons/header';
import ArrowApp from '../../commons/arrowApp';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Progress from '../../commons/progress';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/ManageDeliveryMan.module.css';
import SwitchDeliveryStatus from '../../utils/SwitchDeliveryStatus';
import { useDispatch } from 'react-redux';
import { setPersistence } from '@/store/user';

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

interface Package {
  deliveryStatus?: string;
}

interface User {
  fullName: string;
  status?: string | undefined;
  _id?: string;
  packages?: Package[];
}

export default function ManageDeliveryMan() {
  const [deliveryMans, setDeliveryMans] = useState<User[]>([]);
  const [deliveryManPackages, setDeliveryManPackages] = useState<{ [key: string]: Package[] }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPersistence());
  }, [dispatch]);

  useEffect(() => {
    fetch(`${urlApi}/users/alldeliveryman`)
      .then((response) => response.json())
      .then((deliveryMans: User[]) => {
        setDeliveryMans(deliveryMans);

        const promises = deliveryMans.map((deliveryMan) =>
          fetch(`${urlApi}/packages/${deliveryMan._id}/packagesByUser`)
            .then((response) => response.json())
            .then((packages: Package[]) => ({
              deliveryManId: deliveryMan._id,
              packages: packages,
            }))
        );
        Promise.all(promises).then((results) => {
          const packagesByDeliveryMan: { [key: string]: Package[] } = {};
          results.forEach((result) => {
            packagesByDeliveryMan[result.deliveryManId] = result.packages;
          });
          setDeliveryManPackages(packagesByDeliveryMan);
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const deliveryManPackagesArray = Object.entries(deliveryManPackages).map(
    ([deliveryManId, packages]) => ({
      deliveryManId: deliveryManId,
      packages: packages,
    })
  );

  function countDeliveredPackages(deliveryManPackagesArray) {
    const deliveredPackagesCount = [];

    deliveryManPackagesArray.forEach((deliveryMan) => {
      const deliveredPackages = deliveryMan.packages.filter(
        (pkg) => pkg.deliveryStatus === 'Entregado'
      );

      deliveredPackagesCount.push({
        deliveryManId: deliveryMan.deliveryManId,
        deliveredPackagesCount: deliveredPackages.length,
      });
    });

    return deliveredPackagesCount;
  }

  const deliveredPackagesCount = countDeliveredPackages(deliveryManPackagesArray);

  return (
    <>
      <Container maxWidth="xs" disableGutters={true}>
        <Header />
        <Link href={'/views/manage-schedule'}>
          <ArrowApp />
        </Link>
        <Box mt={2}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ArrowDropDownRoundedIcon />}
              aria-controls="panel1a-content"
            >
              <Typography className={styles.tittle} variant="inherit">
                Repartidores
              </Typography>
            </AccordionSummary>
            <Box>
              <Box className={styles.boxcitomayorcito}>
                {deliveryMans.map((deliveryMan, i) => {
                  const deliveredPackages = deliveredPackagesCount.find(
                    (dm) => dm.deliveryManId === deliveryMan._id
                  );
                  return (
                    <div key={i} className={styles.boxmayor}>
                      <Box className={styles.boxcitomax}>
                        <Progress
                          className={styles.progressCircle}
                          value={
                            deliveredPackages?.deliveredPackagesCount
                              ? deliveredPackages.deliveredPackagesCount + '0'
                              : 0
                          }
                          deliveryStatus={deliveredPackages?.deliveredPackagesCount}
                          deliveryId={deliveredPackages?.deliveryManId}
                        />

                        <Box>
                          <Box className={styles.boxOfdeliveryman}>
                            <Box className={styles.deliveryManContainer}>
                              <Typography className={styles.deliveryName} variant="inherit">
                                {deliveryMan.fullName}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {deliveredPackages?.deliveredPackagesCount !== 10 ? (
                                  <div className={styles.boxStatus}>
                                    <SwitchDeliveryStatus
                                      checked={
                                        deliveryMan.status === 'Activo'
                                          ? 'Viaje en curso'
                                          : 'Inactivo'
                                      }
                                    />
                                    <Typography
                                      className={
                                        deliveryMan.status === 'Activo'
                                          ? styles.deliveryStatusBlue
                                          : styles.deliveryStatusRed
                                      }
                                      variant="inherit"
                                    >
                                      {deliveryMan.status === 'Activo'
                                        ? 'Viaje en Curso'
                                        : deliveryMan.status}
                                    </Typography>
                                  </div>
                                ) : (
                                  <div className={styles.boxStatus}>
                                    <SwitchDeliveryStatus checked={'Finalizó'} />
                                    <Typography
                                      variant="inherit"
                                      className={styles.deliveryStatusFinish}
                                    >
                                      Finalizó
                                    </Typography>
                                  </div>
                                )}
                              </Box>
                              <Box></Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Link
                        href={`/views/delivery-man-details/${deliveryMan._id}`}
                        style={{ marginLeft: 'auto', marginRight: '20px' }}
                      >
                        <Avatar alt="Remy Sharp" />
                      </Link>
                    </div>
                  );
                })}
              </Box>{' '}
            </Box>
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
