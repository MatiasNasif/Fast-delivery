import { Box, Button } from '@mui/material';
import styles from '../styles/ButtonApp.module.css';

export default function ButtonApp(props: any) {
  return (
    <Box className={styles.container_button}>
      <Button className={styles.button}>{props.children}</Button>
    </Box>
  );
}
