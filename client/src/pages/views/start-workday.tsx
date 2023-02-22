import { Box, Accordion, AccordionSummary, Button, Container, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from '../../styles/StartWorkday.module.css';
import dummyData from '../../dummy-data/package-dummy.json';
import Header from '../../commons/header';
import Card from '../../commons/card';
import ButtonApp from '../../commons/ButtonApp';
import Link from 'next/link';

export default function StartWorkday() {
  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Header />
          <Link href="/views/get-packages">
            <ButtonApp>obtener paquetes</ButtonApp>
          </Link>
          <Box className={styles.box}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className={styles.title}>
                  Repartos pendientes
                </Typography>
              </AccordionSummary>
              <Typography variant="subtitle1" className={styles.subtitle}>
                No tenés repartos pendientes
              </Typography>
            </Accordion>
          </Box>
          <Box className={styles.box}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className={styles.title}>
                  Historial de Repartos
                </Typography>
              </AccordionSummary>
              <Typography className={styles.subtitle} variant="subtitle1">
                Ya repartiste 58 paquetes
              </Typography>
              {dummyData.map((dummy: any, i: number) => (
                <Card key={i} dummy={dummy} />
              ))}
            </Accordion>
          </Box>
        </Container>
      </main>
    </>
  );
}
