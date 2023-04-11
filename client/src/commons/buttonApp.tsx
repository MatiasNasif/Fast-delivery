import { Box, Button } from '@mui/material';
import styles from '../styles/ButtonApp.module.css';

interface ButtonAppProps {
  children: string;
  isDisable: boolean;
  variantButton: string;
  typeofButton: string;
  onClick?: () => void;
}

export default function ButtonApp({
  variantButton,
  typeofButton,
  children,
  isDisable,
  onClick,
}: ButtonAppProps) {
  return (
    <Box className={styles.container_button}>
      <Button
        fullWidth
        type={typeofButton}
        variant={variantButton}
        size="small"
        className={styles.button}
        disabled={isDisable}
        onClick={onClick}
      >
        {children}
      </Button>
    </Box>
  );
}
