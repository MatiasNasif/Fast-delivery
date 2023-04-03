import { Typography } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import styles from '../styles/SwitchOnOff.module.css';

interface Props {
  checkSwitchChange: string | undefined;
}

const DeliveryStatus = ({ checkSwitchChange }: Props) => {
  return (
    <div>
      {checkSwitchChange == 'Activo' ? (
        <section className={styles.container_on_off}>
          <section className={styles.container_on}>
            <Brightness1Icon className={styles.brightness_on} />
          </section>
          <section className={styles.container_typography}>
            <Typography className={styles.typography_on}>{checkSwitchChange}</Typography>
          </section>
        </section>
      ) : (
        <section className={styles.container_on_off}>
          <section className={styles.container_off}>
            <Brightness1Icon className={styles.brightness_off} />
          </section>
          <section className={styles.container_typography}>
            <Typography className={styles.typography_off}>{checkSwitchChange}</Typography>
          </section>
        </section>
      )}
    </div>
  );
};

export default DeliveryStatus;
