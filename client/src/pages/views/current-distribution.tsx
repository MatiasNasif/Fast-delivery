import Image from 'next/image';
import {
  Box,
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import brand from '../../assets/brand.png';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import maps from '../../assets/maps.png';
import dummyData from '../../dummy-data/package-dummy.json';

export default function CurrentDistribution() {
  return (
    <Container maxWidth="xs" disableGutters={true}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '10px',
          background: '#FFFFFF',
          WebkitBoxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
          MozBoxShadow: ' 0px 2px 5px -1px rgba(0,0,0,0.75)',
          boxShadow: '0px 2px 5px -1px rgba(0,0,0,0.75)',
        }}
        noValidate
        autoComplete="off"
      >
        <Image src={brand} alt="brand" width={51} height={32} style={{ marginBottom: '5px' }} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '10px',
        }}
      >
        <KeyboardArrowLeftIcon width={26} height={26} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
              Reparto en curso
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Image src={maps} alt="maps" width={287} height={212} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#4F4F4F',
                  fontWeight: 'bold',
                }}
              >
                Destino: <span style={{ fontWeight: 'normal' }}>{dummyData[0].address}</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#4F4F4F',
                  fontWeight: 'bold',
                }}
              >
                # del paquete: <span style={{ fontWeight: 'normal' }}>{dummyData[0].id}</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#4F4F4F',
                  fontWeight: 'bold',
                }}
              >
                Recibe: <span style={{ fontWeight: 'normal' }}>{dummyData[0].receiver}</span>
              </Typography>
            </Box>
          </AccordionDetails>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          >
            <Button
              sx={{
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '15px',
                lineHeight: '26px',
                letterSpacing: '0.46px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                borderRaduis: '5px',
              }}
              variant="contained"
            >
              Finalizar
            </Button>
          </Box>
        </Accordion>
      </Box>
    </Container>
  );
}
