import { Box, Typography, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '../styles/Card.module.css';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setPackage } from '@/store/packageIdSelected';
import { useRouter } from 'next/router';

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

const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export default function PackageDetailsCard({
  packageDetail,
  hideDeliveryStatus,
  onDeletePackage,
}: Props) {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleDeletePackage = (packageId: string) => {
    return fetch(`${urlApi}/packages/${packageId}`, {
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = (packageId: string): void => {
    dispatch(setPackage(packageId));
    navigate.push('current-distribution');
  };

  return (
    <>
      <Box className={styles.card_container}>
        <LocalShippingIcon
          fontSize="large"
          className={styles.icon_card_shipping}
          onClick={() => handleClick(packageDetail?._id)}
        />
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
    </>
  );
}
