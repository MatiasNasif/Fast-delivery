import { Box, Typography, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '../styles/Card.module.css';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useAlert } from '@/hook/Alerthook';
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
  const showAlert = useAlert();

  const handleDeletePackage = (packageId: string) => {
    setIsDeleting(true);
    setTimeout(() => {
      fetch(`${urlApi}/packages/${packageId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Fallo al querer eliminar el paquete');
          } else {
            showAlert({
              message: 'Paquete eliminado correctamente',
              typeAlert: 'success',
              showCloseButton: true,
            });
            onDeletePackage();
            setTimeout(() => {
              setIsDeleting(false);
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsDeleting(false);
        });
    }, 1000);
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
