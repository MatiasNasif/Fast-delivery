import { Box, Container, Accordion, AccordionSummary, Typography, Avatar } from '@mui/material';
import Header from '../../commons/header';
import ArrowApp from '../../commons/arrowApp';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Progress from '../../commons/progress';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Delivery, requestDelivery } from '../../utils/fakerDeliverys';
import styles from '../../styles/ManageDeliveryMan.module.css';
import SwitchDeliveryStatus from '../../utils/SwitchDeliveryStatus';

export default function ManageDeliveryMan() {
  const [deliverys, setDeliverys] = useState<Delivery[]>([]);

  useEffect(() => {
    requestDelivery(3).then((delivery) => {
      setDeliverys(delivery);
    });
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
            {deliverys.map((data, i) => (
              <Box key={i}>
                <Box className={styles.boxOfdeliveryman}>
                  <Progress value={data.circle} deliveryStatus={data.deliveryStatus} />
                  <Box className={styles.deliveryManContainer}>
                    <Typography className={styles.deliveryName} variant="inherit">
                      {data.firstname}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography className={styles.deliveryStatus} variant="inherit">
                        {data.deliveryStatus &&
                          (data.circle === 100 ? (
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
                          ) : data.circle >= 50 && data.circle <= 99 ? (
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
                          ) : data.circle >= 1 && data.circle <= 49 ? (
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
                    href={`/views/delivery-man-details/${data.id}`}
                    style={{ marginLeft: 'auto', marginRight: '20px' }}
                  >
                    <Avatar alt="Remy Sharp" src={data.avatar} />
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
