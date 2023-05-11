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
import Calendar from '../../commons/daySlide';
import Progress from '../../commons/progress';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '@/commons/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { setPersistence } from '@/store/user';

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

interface User {
  status: string | undefined;
  avatar?: string;
  id?: string;
  fullName?: string;
  admin?: boolean;
  photo?: string;
}

interface Package {
  deliveryStatus: string;
}

const ManageSchedule = () => {
  const today = new Date();
  const day: string = today.getDate().toString().padStart(2, '0');
  const month: string = (today.getMonth() + 1).toString();
  const year: string = today.getFullYear().toString().slice(-2);
  const dateFormatted: string = `${day}-${month}-${year}`;

  const [deliveryMans, setDeliveryMans] = useState<User[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(dateFormatted);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState<Boolean>(true);
  const [userPhoto, setUserPhoto] = useState('');

  // useEffect(() => {
  //   const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user') ?? '');
  //   setUserPhoto(user?.photo);
  // }, []);

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
        setIsLoadingSpinner(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${urlApi}/packages/${dateFormatted}/delivery-date`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((packageByDate: Package[]) => {
        setPackages(packageByDate);
      })
      .catch((error) => console.log(error));
  }, []);

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

  const deliveryMansPhotos = deliveryMans.filter((deliveryMans) => deliveryMans.photo);

  const deliveryMansWithPhotoAndActiveStatus = deliveryMansPhotos.filter(
    (deliveryUser) => deliveryUser.photo && deliveryUser.status === 'Activo'
  );

  const randomActiveDeliveryMans = deliveryMansWithPhotoAndActiveStatus
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <>
      {isLoadingSpinner ? (
        <Spinner />
      ) : (
        <Container disableGutters={true} className={styles.containerManage}>
          <Header
            onClickedLogout={() => setIsLoading(true)}
            onClickedProfile={() => setIsLoading(true)}
          />
          <Box className={styles.boxAdmin}>
            <Link href={`/views/profile/${user?.id}`}>
              <Avatar alt="Admin" src={user?.photo} className={styles.avatarAdmin} />
            </Link>
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
          <Box mt={2} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ArrowDropDownSharpIcon />}
                aria-controls="panel1a-content"
              >
                <Typography className={styles.textOfdetails} variant="inherit">
                  {selectedDate} - Detalles
                </Typography>
              </AccordionSummary>
              <Box>
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
                    {randomActiveDeliveryMans.map((deliveryUser, i) => (
                      <Avatar key={i} alt="Remy Sharp" src={deliveryUser.photo} />
                    ))}
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
              <Box>
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
            </Accordion>
          </Box>
        </Container>
      )}
    </>
  );
};
export default ManageSchedule;
