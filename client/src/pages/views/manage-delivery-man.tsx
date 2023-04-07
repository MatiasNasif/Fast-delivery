import { Box, Container, Accordion, AccordionSummary, Typography, Avatar } from '@mui/material';
import Header from '../../commons/header';
import ArrowApp from '../../commons/arrowApp';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Progress from '../../commons/progress';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/ManageDeliveryMan.module.css';
import SwitchDeliveryStatus from '../../utils/SwitchDeliveryStatus';

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

  useEffect(() => {
    fetch(`${urlApi}/users/alldeliveryman`)
      .then((response) => response.json())
      .then((deliveryMans: User[]) => setDeliveryMans(deliveryMans))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="xs" disableGutters={true}>
        <Link href={'/views/manage-schedule'}>
          <ArrowApp />
        </Link>
        <Box mt={2}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownRoundedIcon />}
              aria-controls="panel1a-content"
            >
              <Typography className={styles.tittle} variant="inherit">
                Repartidores
              </Typography>
            </AccordionSummary>
            {deliveryMans.map((deliveryMan, i) => (
              <Box key={i}>
                <Box className={styles.boxOfdeliveryman}>
                  <Progress
                    value={deliveryMan.circle}
                    deliveryStatus={deliveryMan.status}
                    deliveryId={deliveryMan._id}
                  />
                  <Box className={styles.deliveryManContainer}>
                    <Typography className={styles.deliveryName} variant="inherit">
                      {deliveryMan.fullName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography className={styles.deliveryStatus} variant="inherit">
                        {deliveryMan.status &&
                          (deliveryMan.circle === 100 ? (
                            <>
                              <Box className={styles.boxDeliveryStatus}>
                                <SwitchDeliveryStatus checked={'Finalizó'} />
                                <Typography
                                  className={styles.deliveryStatusFinish}
                                  variant="inherit"
                                >
                                  Finalizó
                                </Typography>{' '}
                              </Box>
                            </>
                          ) : deliveryMan.circle >= 50 && deliveryMan.circle <= 99 ? (
                            <>
                              <Box className={styles.boxDeliveryStatus}>
                                <SwitchDeliveryStatus checked={'Viaje en curso'} />
                                <Typography
                                  className={styles.deliveryStatusInCourse}
                                  variant="inherit"
                                >
                                  Viaje en curso
                                </Typography>{' '}
                              </Box>
                            </>
                          ) : deliveryMan.circle >= 1 && deliveryMan.circle <= 49 ? (
                            <>
                              {' '}
                              <Box className={styles.boxDeliveryStatus}>
                                <SwitchDeliveryStatus checked={'Inactivo'} />
                                <Typography
                                  className={styles.deliveryStatusInactive}
                                  variant="inherit"
                                >
                                  Inactivo
                                </Typography>{' '}
                              </Box>
                            </>
                          ) : (
                            ''
                          ))}
                      </Typography>
                    </Box>
                  </Box>
                  <Link
                    href={`/views/delivery-man-details/${deliveryMan._id}`}
                    style={{ marginLeft: 'auto', marginRight: '20px' }}
                  >
                    <Avatar alt="Remy Sharp" />
                  </Link>
                </Box>
              </Box>
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
