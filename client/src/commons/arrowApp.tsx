import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import styles from '../styles/ArrowApp.module.css';

export default function ArrowApp() {
  return (
    <Box className={styles.container_icon_arrow}>
      <KeyboardArrowLeftIcon cursor="pointer" className={styles.icon_arrow} />
    </Box>
  );
}
