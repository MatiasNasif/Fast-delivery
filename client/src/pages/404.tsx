import brand from '../../src/assets/brand.png';
import branding from '../../src/assets/branding.svg';
import { Container, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Roboto } from '@next/font/google';
import { Inter } from '@next/font/google';
import styles from '../styles/404.module.css';
import ButtonApp from '@/commons/buttonApp';
import Link from 'next/link';
import { useRouter } from 'next/router';

const roboto = Roboto({ subsets: ['latin'], weight: '900' });
const inter = Inter({ subsets: ['latin'] });

export default function Custom404() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <>
      <Container
        maxWidth={'xs'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100svh',
          width: '100vw',
        }}
      >
        <Box>
          <Image src={branding} style={{ height: '200px', width: '300px' }} />

          <Box className={styles.boxError404}>
            <h2 className={styles.errorText}> ERROR</h2>
            <h2 className={styles.errorNumber}> 404</h2>
          </Box>
          <p className={styles.errorTextPage}> Pagina no encontrada</p>
          <ButtonApp onClick={goBack} variantButton="contained">
            Volver
          </ButtonApp>
        </Box>
      </Container>
    </>
  );
}
