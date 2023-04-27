import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

const SwitchSworn = (props) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    if (button == 'no') {
      setActiveButton('no');
    } else {
      setActiveButton('si');
    }
  };

  useEffect(() => {
    if (activeButton !== null) {
      props.onChange(activeButton);
    }
  }, [activeButton]);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        data-testid="si-button"
        variant={activeButton === 'si' ? 'contained' : 'contained'}
        color={activeButton === 'si' ? 'error' : 'error'}
        endIcon={<SentimentDissatisfiedOutlinedIcon />}
        onClick={() => handleButtonClick('si')}
        disabled={activeButton === 'no'}
      >
        Si
      </Button>
      <Button
        data-testid="no-button"
        sx={{ marginLeft: '20px' }}
        variant={activeButton === 'no' ? 'contained' : 'contained'}
        color={activeButton === 'no' ? 'success' : 'success'}
        endIcon={<SentimentSatisfiedAltOutlinedIcon />}
        onClick={() => handleButtonClick('no')}
        disabled={activeButton === 'si'}
      >
        No
      </Button>
    </Box>
  );
};

export default SwitchSworn;
