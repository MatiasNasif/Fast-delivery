import { Box, Typography, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '../styles/Card.module.css';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import 'animate.css';

interface Props {
  packageDetail: Package;
  hideDeliveryStatus?: boolean;
  onDeletePackage: () => void;
}

interface Package {
  address: string;
  deliveryStatus: string;
  _id: string;
}

interface User {
  admin: boolean;
}

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export default function PackageDetailsCard({
  packageDetail,
  hideDeliveryStatus,
  onDeletePackage,
}: Props) {
  const [isDeleting, setIsDeleting] = useState<Boolean>(false);
  const user: User = useSelector((state) => state.user);

  const handleDeletePackage = (packageId: string) => {
    setIsDeleting(true); // Establecer el estado en true

    // Agregar una animación de espera antes de ejecutar el fetch
    setTimeout(() => {
      fetch(`${urlApi}/packages/${packageId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Fallo al querer eliminar el paquete');
          } else {
            enqueueSnackbar('Paquete eliminado correctamente', {
              variant: 'success',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
              },
              style: {
                fontSize: '16px',
                color: '#fffff',
                fontWeight: 'bold',
              },
            });
            onDeletePackage();

            // Esperar a que se complete la animación antes de establecer el estado en false
            setTimeout(() => {
              setIsDeleting(false); // Establecer el estado en false
            }, 1000); // Esperar 1 segundo antes de establecer el estado en false
          }
        })
        .catch((error) => {
          console.error(error);
          setIsDeleting(false); // Establecer el estado en false en caso de error
        });
    }, 1000); // Esperar 2 segundos antes de ejecutar el fetch
  };

  return (
    <>
      <Box className={isDeleting && `${styles.card_container_all} animate__backOutRight`}>
        <Box className={styles.card_container}>
          {user?.admin === true ? (
            <LocalShippingIcon fontSize="large" className={styles.icon_card_shipping} />
          ) : (
            <Link href={`/views/current-distribution/${packageDetail?._id}`}>
              <LocalShippingIcon fontSize="large" className={styles.icon_card_shipping} />
            </Link>
          )}
          <Typography variant="subtitle1" className={styles.address}>
            {packageDetail?.address}
          </Typography>
          <Box className={styles.icon_delete}>
            <DeleteForeverIcon
              className={styles.deleteButton}
              color="error"
              onClick={() => handleDeletePackage(packageDetail?._id)}
            />
          </Box>
        </Box>
        {!hideDeliveryStatus && (
          <Typography className={styles.status} variant="h6">
            {packageDetail?.deliveryStatus}
          </Typography>
        )}
        <Divider className={styles.divider} />
      </Box>
    </>
  );
}
