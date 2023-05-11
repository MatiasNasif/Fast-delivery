import { Box, Container, Accordion, AccordionSummary, Typography, Avatar } from '@mui/material';
import Header from '../../commons/header';
import ArrowApp from '../../commons/arrowApp';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Progress from '../../commons/progress';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/ManageDeliveryMan.module.css';
import SwitchDeliveryStatus from '../../utils/SwitchDeliveryStatus';
import { useRouter } from 'next/router';
import Spinner from '@/commons/Spinner';

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

interface Package {
  deliveryStatus?: string;
}

interface User {
  fullName: string;
  status?: string | undefined;
  _id?: string;
  packages?: Package[];
  photo?: string;
  admin: boolean;
}

const ManageDeliveryMan = () => {
  const [deliveryMans, setDeliveryMans] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState<Boolean>(true);
  const [deliveryManPackages, setDeliveryManPackages] = useState<{ [key: string]: Package[] }>({});

  const router = useRouter();

  const user: User =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');

  if (user.admin === false) {
    router.push('/views/start-workday');
  }

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

          setIsLoadingSpinner(false);
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
      const pendingsPackages = deliveryMan.packages.filter(
        (pkg) => pkg.deliveryStatus === 'En curso' || pkg.deliveryStatus === 'Pendiente'
      );

      deliveredPackagesCount.push({
        deliveryManId: deliveryMan.deliveryManId,
        deliveredPackagesCount: deliveredPackages.length,
        pendingsPackagesCount: pendingsPackages.length,
        totalPackages: pendingsPackages.length + deliveredPackages.length,
      });
    });

    return deliveredPackagesCount;
  }

  const allPackagesCount = countDeliveredPackages(deliveryManPackagesArray);

  return (
    <>
      {isLoadingSpinner ? (
        <Spinner />
      ) : (
        <Container
          className={styles.containerManageDeliveryMan}
          maxWidth="xs"
          disableGutters={true}
        >
          <Header
            onClickedLogout={() => setIsLoading(true)}
            onClickedProfile={() => setIsLoading(true)}
          />
          <Link href={'/views/manage-schedule'}>
            <ArrowApp />
          </Link>
          <Box className={styles.boxManageDeliveryMan} mt={2}>
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
                    const deliveredPackages = allPackagesCount.find(
                      (dm) => dm.deliveryManId === deliveryMan._id
                    );
                    return (
                      <Box key={i} className={styles.boxmayor}>
                        <Box className={styles.boxcitomax}>
                          <Progress
                            className={styles.progressCircle}
                            value={
                              deliveredPackages?.deliveredPackagesCount === 0 &&
                              deliveredPackages?.totalPackages === 0
                                ? 0
                                : (deliveredPackages?.deliveredPackagesCount /
                                    deliveredPackages?.totalPackages) *
                                  100
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
                                    <Box className={styles.boxStatus}>
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
                                            ? styles.deliveryStatusBlue // Si está activo o tiene paquetes en curso, usa el estilo de estado azul
                                            : styles.deliveryStatusRed // Si no, usa el estilo de estado rojo
                                        }
                                        variant="inherit"
                                      >
                                        {
                                          deliveryMan.status === 'Activo' &&
                                          deliveredPackages?.pendingsPackagesCount
                                            ? 'Viaje en curso' // Si está activo y tiene paquetes en curso, muestra "Viaje en curso"
                                            : deliveryMan.status // Si no, muestra el estado actual
                                        }
                                      </Typography>
                                    </Box>
                                  ) : (
                                    <Box className={styles.boxStatus}>
                                      <SwitchDeliveryStatus checked={'Finalizó'} />
                                      <Typography
                                        variant="inherit"
                                        className={styles.deliveryStatusFinish}
                                      >
                                        Finalizó
                                      </Typography>
                                    </Box>
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
                          <Avatar src={deliveryMan.photo} alt="Remy Sharp" />
                        </Link>
                      </Box>
                    );
                  })}
                </Box>{' '}
              </Box>
            </Accordion>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ManageDeliveryMan;
