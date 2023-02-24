import {
  Box,
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Progress from '../../commons/progress';
import DeliveryDummy from '../../dummy-data/Delivery-progress.json';
import Link from 'next/link';
import styles from '../../styles/ManageDeliveryMan.module.css';

export default function ManageDeliveryMan() {
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
            {DeliveryDummy.map((data, i) => (
              <Box key={i}>
                <Box className={styles.boxOfdeliveryman}>
                  <Progress value={data.circle} colorCircle={data.color} />
                  <Box className={styles.deliveryManContainer}>
                    <Typography className={styles.deliveryName} variant="inherit">
                      {data.deliveryName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        className={styles.deliveryManDot}
                        sx={{ backgroundColor: data.dotColor }}
                      ></Box>
                      <Typography
                        className={styles.deliveryStatus}
                        variant="inherit"
                        color={data.dotColor}
                      >
                        {data.status}
                      </Typography>
                    </Box>
                  </Box>

                  <Avatar
                    alt="Remy Sharp"
                    src={data.image}
                    sx={{ marginLeft: 'auto', marginRight: '20px' }}
                  />
                </Box>
              </Box>
            ))}
          </Accordion>
        </Box>
      </Container>
    </>
  );
}
