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
export default function CircularStatic(props: any) {
  const [progress, setProgress] = React.useState(20);
  const deliveryStatusMessages = {
    'Viaje en curso': (
      <CircularProgressWithLabel size={60} className={styles.travelInCourse} value={props.value} />
    ),
    Finalizó: (
      <CircularProgressWithLabel
        size={60}
        className={styles.travelInFinalization}
        value={props.value}
      />
    ),
    Inactivo: (
      <CircularProgressWithLabel size={60} className={styles.travelInactive} value={props.value} />
    ),
  };
  let deliveryStatus = props.deliveryStatus;
  if (props.value == 100) {
    deliveryStatus = 'Finalizó';
  } else if (props.value >= 1 && props.value <= 20) {
    deliveryStatus = 'Inactivo';
  } else if (props.value >= 21 && props.value <= 99) {
    deliveryStatus = 'Viaje en curso';
  }
  return (
    <>
      {' '}
      <Box sx={{ marginLeft: '2%' }}>{deliveryStatusMessages[deliveryStatus]}</Box>
    </>
  );
}
