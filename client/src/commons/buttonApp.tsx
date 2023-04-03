import { Box, Button } from '@mui/material';
import styles from '../styles/ButtonApp.module.css';

interface ButtonAppProps {
  children: string;
  isDisable: boolean;
}

export default function ButtonApp({ variantButton, children, isDisable }: ButtonAppProps) {
  return (
    <Box className={styles.container_button}>
      <Button
        fullWidth
        type={children}
        variant={variantButton}
        size="small"
        className={styles.button}
        disabled={isDisable}
      >
        {children}
      </Button>
    </Box>
  );
}
