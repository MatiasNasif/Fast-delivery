import { Box, Typography, Divider } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styles from '../styles/Card.module.css';

export default function Card({ dummy }: any) {
  return (
    <>
      <Box className={styles.card_container}>
        <LocalShippingIcon fontSize="large" className={styles.icon_card_shipping} />
        <Typography variant="subtitle1" className={styles.address}>
          {dummy.address}
        </Typography>
        <Box className={styles.icon_delete}>
          <DeleteForeverIcon color="error" />
        </Box>
      </Box>
      <Typography className={styles.status} variant="h6">
        {dummy.deliveryStatus}
      </Typography>
      <Divider className={styles.divider} />
    </>
  );
}
