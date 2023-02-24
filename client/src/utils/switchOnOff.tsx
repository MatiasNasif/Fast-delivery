import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import styles from '../styles/SwitchOnOff.module.css';

const SwitchOnOff = ({ checked }: { checked: boolean }) => {
  return (
    <div>
      {checked == true ? (
        <div className={styles.container_on_off}>
          <div className={styles.container_on}>
            <Brightness1Icon className={styles.brightness_on} />
          </div>
          <div className={styles.container_typography}>
            <Typography className={styles.typography_on}>Activo</Typography>
          </div>
        </div>
      ) : (
        <div className={styles.container_on_off}>
          <div className={styles.container_off}>
            <Brightness1Icon className={styles.brightness_off} />
          </div>
          <div className={styles.container_typography}>
            <Typography className={styles.typography_off}>Inactivo</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitchOnOff;
