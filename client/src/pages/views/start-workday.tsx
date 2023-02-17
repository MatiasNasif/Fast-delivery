import {
  Box,
  Accordion,
  AccordionSummary,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import brand from '../../assets/brand.png';
import styles from '../../styles/StartWorkday.module.css';
import { styled } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import dummyData from '../../dummy-data/package-dummy.json';

export default function StartWorkday() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <main>
        <Container maxWidth="xs" disableGutters={true}>
          <Box
            component="form"
            sx={{
              width: '100%',
              height: '38px',
              display: 'flex',
              justifyContent: 'start',
              WebkitBoxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
              MozBoxShadow: ' 0px 2px 5px -1px rgba(0,0,0,0.75)',
              boxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
            }}
            noValidate
            autoComplete="off"
          >
            <Image
              // className={styles.brand}
              src={brand}
              alt="Fast Delivery Brand"
              width={51}
              height={32}
            />
          </Box>
          <Box mt={2} px={2}>
            <Button fullWidth variant="contained" size="small" className={styles.box}>
              OBTENER PAQUETES
            </Button>
          </Box>
          <Box mt={2} px={2}>
            <Accordion className={styles.box}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Repartos pendientes
                </Typography>
              </AccordionSummary>
              <Typography ml={2} variant="subtitle1" sx={{ fontSize: '12px', marginBottom: '5%' }}>
                No tenés repartos pendientes
              </Typography>
            </Accordion>
          </Box>
          <Box mt={2} px={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Historial de Repartos
                </Typography>
              </AccordionSummary>
              <Typography ml={2} variant="subtitle1" sx={{ fontSize: '12px' }}>
                Ya repartiste 58 paquetes
              </Typography>
              {dummyData.map((dummy: any, i: number) => (
                <>
                  <Box display={'flex'} sx={{ marginTop: '5%', justifyContent: 'space-between' }}>
                    <LocalShippingIcon
                      fontSize="large"
                      sx={{
                        marginLeft: '5%',
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#E8EFFA',
                        borderRadius: '5%',
                      }}
                    />
                    <Typography
                      ml={2}
                      variant="subtitle1"
                      sx={{ fontSize: '12px', width: '156px', marginTop: '2%' }}
                    >
                      {dummy.address}
                    </Typography>
                    <Box sx={{ marginRight: '5%', marginTop: '2%' }}>
                      <DeleteForeverIcon color="error" />
                    </Box>
                  </Box>
                  {dummy.deliveryStatus === 'Entregado' ? (
                    <Typography
                      key={i}
                      ml={2}
                      variant="h6"
                      sx={{
                        fontSize: '12px',
                        textAlign: 'end',
                        marginRight: '5%',
                        color: 'black',
                      }}
                    >
                      {dummy.deliveryStatus}
                    </Typography>
                  ) : (
                    <Typography
                      key={i}
                      ml={2}
                      variant="h6"
                      sx={{
                        fontSize: '12px',
                        textAlign: 'end',
                        marginRight: '5%',
                        color: '#D9C830',
                      }}
                    >
                      {dummy.deliveryStatus}
                    </Typography>
                  )}
                  <Divider sx={{ m: '5%' }} />
                </>
              ))}
            </Accordion>
          </Box>
        </Container>
      </main>
    </>
  );
}
