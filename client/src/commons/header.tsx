import { Box } from '@mui/material';
import Image from 'next/image';
import brand from '../assets/brand.png';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <Box className={styles.header_container} component="form" noValidate autoComplete="off">
      <Image src={brand} alt="Fast Delivery Brand" className={styles.logo} />
    </Box>
  );
}
