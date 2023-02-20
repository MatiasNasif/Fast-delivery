import styles from '../../styles/CurrentDistribution.module.css';
import Image from 'next/image';
import brand from '../../assets/brand.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import maps from '../../assets/maps.png';
import dummyData from '../../dummy-data/package-dummy.json';
import {
  Box,
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ArrowApp from '@/components/ArrowApp';

export default function CurrentDistribution() {
  return (
    <Container maxWidth="xs" disableGutters={true}>
      <Box component="form" className={styles.header__container} noValidate autoComplete="off">
        <Image className={styles.header_container_image} src={brand} alt="brand" />
      </Box>

      <ArrowApp />

      <Box className={styles.container_accordion}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className={styles.container_accordion_title}>
              Reparto en curso
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Image src={maps} alt="maps" className={styles.container_accordion_maps} />
            </Box>
            <Box>
              <Typography className={styles.container_accordion_subtitle}>
                Destino:{' '}
                <span className={styles.container_accordion_subtitle_details}>
                  {dummyData[0].address}
                </span>
              </Typography>
              <Typography className={styles.container_accordion_subtitle}>
                # del paquete:{' '}
                <span className={styles.container_accordion_subtitle_details}>
                  {dummyData[0].id}
                </span>
              </Typography>
              <Typography className={styles.container_accordion_subtitle}>
                Recibe:{' '}
                <span className={styles.container_accordion_subtitle_details}>
                  {dummyData[0].receiver}
                </span>
              </Typography>
            </Box>
          </AccordionDetails>
          <Box className={styles.container_button}>
            <Button className={styles.button} variant="contained">
              Finalizar
            </Button>
          </Box>
        </Accordion>
      </Box>
    </Container>
  );
}
