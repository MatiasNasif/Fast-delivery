import {
  Box,
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Progress from './progressDeliveryMan';
import DeliveryDummy from '../../dummy-data/Delivery-progress.json';

export default function ManagerDeliveryMan() {
  return (
    <Container maxWidth="xs" disableGutters={true}>
      <Box mt={2}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownRoundedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {' '}
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700',
                fontFamily: 'Roboto',
              }}
              variant="inherit"
              color="black"
            >
              Repartidores
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '100%' }}></Typography>
          </AccordionSummary>
          {DeliveryDummy.map((data, i) => (
            <Box key={i}>
              <Box sx={{ display: 'flex', marginTop: '20px' }}>
                <Progress value={data.circle} colorCircle={data.color} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: '18px',
                      fontWeight: '700',
                      fontFamily: 'Roboto',
                      marginLeft: '20px',
                    }}
                    variant="inherit"
                    color="black"
                  >
                    {data.deliveryName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '400',
                      fontFamily: 'Roboto',
                      marginLeft: '20px',
                      marginTop: '5px',
                    }}
                    variant="inherit"
                    color={data.dotColor}
                  >
                    {data.status}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  marginBottom: '5px',
                }}
              ></Box>
            </Box>
          ))}
        </Accordion>
      </Box>
    </Container>
  );
}
