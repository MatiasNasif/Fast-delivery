import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '../styles/Progress.module.css';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{ fontFamily: 'Roboto', fontWeight: 700, color: 'black' }}
          variant="caption"
          component="div"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  value: number;
  deliveryStatus: string;
  _id: string;
}

export default function CircularStatic({ value, deliveryStatus, _id }: Props) {
  const [progress, setProgress] = React.useState(20);
  const deliveryStatusMessages = {
    'Viaje en curso': (
      <CircularProgressWithLabel size={60} className={styles.travelInCourse} value={value} />
    ),
    Finalizó: (
      <CircularProgressWithLabel size={60} className={styles.travelInFinalization} value={value} />
    ),
    Inactivo: (
      <CircularProgressWithLabel size={60} className={styles.travelInactive} value={value} />
    ),
  };
  let deliveryManStatus = deliveryStatus;
  if (value == 100) {
    deliveryManStatus = 'Finalizó';
  } else if (value >= 0 && value <= 20) {
    deliveryManStatus = 'Inactivo';
  } else if (value >= 21 && value <= 99) {
    deliveryManStatus = 'Viaje en curso';
  }
  return (
    <>
      {' '}
      <Box sx={{ marginLeft: '2%' }}>{deliveryStatusMessages[deliveryManStatus]}</Box>
    </>
  );
}
