import { Box, Button } from '@mui/material';
import styles from '../styles/ButtonApp.module.css';

export default function ButtonApp(props: string) {
  return (
    <Box className={styles.container_button}>
      <Button
        fullWidth
        type={props.children}
        variant="contained"
        size="small"
        className={styles.button}
      >
        {props.children}
      </Button>
    </Box>
  );
}
