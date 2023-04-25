import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import styles from '../styles/ArrowApp.module.css';

interface Arrowprop {
  onClick: () => void;
}

export default function ArrowApp({ onClick }: Arrowprop) {
  return (
    <Box className={styles.container_icon_arrow} onClick={onClick}>
      <KeyboardArrowLeftIcon cursor="pointer" onClick={onClick} className={styles.icon_arrow} />
    </Box>
  );
}
