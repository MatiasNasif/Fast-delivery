import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default function CircularStatic(props) {
  const [progress, setProgress] = React.useState(20);

  return (
    <>
      {' '}
      <Box sx={{ marginLeft: '2%' }}>
        <CircularProgressWithLabel
          sx={{ color: props.colorCircle }}
          size={60}
          value={props.value}
        />
      </Box>
    </>
  );
}
