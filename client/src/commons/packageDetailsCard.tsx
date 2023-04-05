import { Box, Typography, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '../styles/Card.module.css';

interface Props {
  packageDetail: Package;
  hideDeliveryStatus?: boolean;
}

interface Package {
  address: string;
  deliveryStatus: string;
}

export default function PackageDetailsCard({ packageDetail, hideDeliveryStatus }: Props) {
  return (
    <>
      <Box className={styles.card_container}>
        <LocalShippingIcon fontSize="large" className={styles.icon_card_shipping} />
        <Typography variant="subtitle1" className={styles.address}>
          {packageDetail?.address}
        </Typography>
        <Box className={styles.icon_delete}>
          <DeleteForeverIcon color="error" />
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
