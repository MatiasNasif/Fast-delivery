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
import { Delivery, requestDelivery } from '../../utils/fakerDeliverys';
import Link from 'next/link';

export default function ManageSchedule() {
  let date: Date = new Date();
  const dateNum = date.getMonth() + 1;
  const dateFullyear = date.getFullYear().toString().slice(-2);
  const AvatarAdmin =
    'https://s3-alpha-sig.figma.com/img/ca72/1ec9/b816d9daff04c19b30e7f617c2998327?Expires=1678060800&Signature=UD49y0YFkM1Eb~M-OWiWSIAP-oEv6pgi5dWHBp8hnkQc~tWvWQWTCSco8r7QJBW~gSovjotvrhgR-DyU0nwI-SuaSxc9jDnTPFAf3gztC8WEIte4GLvj406RVwe5xWbUhgfd8ZJv099OAPM16kIhJwT~dmNpvslBsd7U~KgUcx6M4l00dL1vfrkXe-bNFAcWWhZQAHKWOGJZc9LI4Oi3zoOBsvPoNemgJGrixiIetJC~mJUFFnesxs38-0mSYTAQSzd4~EBNCz0PHNbPBEzrvZnLLSTLaTDySkurmoNdJrmlYFwouw1ToYhWRAz-4-aZRI-euJ-qfh5pg3Hfdxg~ug__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

  PackageDummy;

  const [deliverys, setDeliverys] = useState<Delivery[]>([]);

  useEffect(() => {
    requestDelivery(3).then((delivery) => {
      setDeliverys(delivery);
    });
  }, []);

  return (
    <>
      <Header />
      <Container disableGutters={true} className={styles.containerManage}>
        <Box className={styles.boxAdmin}>
          <Avatar alt="Admin" src={AvatarAdmin} />
          <Box>
            <Typography className={styles.helloAdmin} variant="inherit" color="black">
              Hola Admin!
            </Typography>
            <Typography className={styles.textOfmanage} variant="inherit" color="black">
              Gestionar Pedidos
            </Typography>
          </Box>
        </Box>
        <Calendar />
        <Box mt={2}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownSharpIcon />}
              aria-controls="panel1a-content"
            >
              <Typography className={styles.textOfdetails} variant="inherit">
                {date.getDate()}/{dateNum >= 1 ? '0' + dateNum : dateNum}/{dateFullyear} - Detalles
              </Typography>
            </AccordionSummary>
            {CircleDummy.map((data, i) => (
              <Box key={i}>
                <Box className={styles.boxOfdeliveryman}>
                  <Progress value={data.circle} colorCircle={data.color} />
                  <Box sx={{ width: '100%' }}>
                    <Typography className={styles.textOfdeliveryman} variant="inherit">
                      Repartidores
                    </Typography>
                    <Typography className={styles.textOfstatus} variant="inherit">
                      {data.activos} {data.status}
                    </Typography>
                  </Box>
                  <AvatarGroup max={2} sx={{ marginLeft: 'auto', marginRight: '20px' }}>
                    <Avatar alt="Remy Sharp" src={data.image.AvatarImgOne} />
                    <Avatar alt="Travis Howard" src={data.image.AvatarImgTwo} />
                  </AvatarGroup>
                </Box>
                <Box className={styles.boxBtn}>
                  <Box mt={2} px={2}>
                    <Link href={'/views/manage-delivery-man'}>
                      <Button fullWidth variant="contained" size="small">
                        {data.nameBtn}
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Box>
            ))}
            {PackageDummy.map((data, i) => (
              <Box key={i}>
                <Box className={styles.boxOfpackages}>
                  <Progress value={data.circle} colorCircle={data.color} />
                  <Box sx={{ width: '100%' }}>
                    <Typography className={styles.textOfdeliveryman} variant="inherit">
                      {data.name}
                    </Typography>

                    <Typography className={styles.textOfstatus} variant="inherit">
                      {data.activos} {data.status}
                    </Typography>
                  </Box>{' '}
                </Box>

                <Box className={styles.boxBtn}>
                  <Box mt={2} px={2}>
                    <Link href={'/views/manage-packages'}>
                      <Button fullWidth variant="contained" size="small" className={styles.box}>
                        {data.nameBtn}
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
