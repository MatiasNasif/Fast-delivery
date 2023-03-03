import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import styles from '../styles/SwitchDeliveryStatus.module.css';

const SwitchDeliveryStatus = ({ checked }: { checked: string }) => {
  return (
    <div>
      {checked === 'Finalizó' ? (
        <div className={styles.container_on_off}>
          <div className={styles.container_on}>
            <Brightness1Icon className={styles.brightness_finish} />
          </div>
        </div>
      ) : checked === 'Viaje en curso' ? (
        <div className={styles.container_on_off}>
          <div className={styles.container_off}>
            <Brightness1Icon className={styles.brightness_travel_in_course} />
          </div>
        </div>
      ) : checked === 'Inactivo' ? (
        <div className={styles.container_on_off}>
          <div className={styles.container_off}>
            <Brightness1Icon className={styles.brightness_inactive} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SwitchDeliveryStatus;
