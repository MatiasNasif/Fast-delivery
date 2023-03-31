import { useState } from 'react';
import Header from '@/commons/header';
import ArrowApp from '@/commons/arrowApp';
import ButtonApp from '@/commons/buttonApp';
import { Container, Box, Typography } from '@mui/material';
import styles from '../../styles/SwornStarment.module.css';
import Checkbox from '@mui/material/Checkbox';
import SwitchSworn from '../../commons/switchSworn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const SwornStatement = () => {
  const repetitiveText = [
    {
      text: '¿Ha consumido bebidas alcohólicas en las últimas 24 horas?',
      name: 'alcohol',
    },
    {
      text: '¿Usted está haciendo uso de medicamentos psicoactivos? (tranquilizantes,antigripales,antialérgicos o para insomnio)',
      name: 'medicines',
    },
    {
      text: '¿Tiene usted algún problema familiar emocional o de cualquier tipo que lo distraiga?',
      name: 'problems',
    },
  ];

  const userId = useSelector((state) => state.user?.id ?? null);

  const [answers, setAnswers] = useState({});
  const navigate = useRouter();

  const dataForm = {
    user: userId,
    ...answers,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/formsworn/createforms', dataForm)
      .catch((err) => console.log(err));

    navigate.push('/views/start-workday');
  };

  return (
    <Container maxWidth={'xs'} disableGutters={true}>
      <>
        <Header />
        <Link href="/">
          <ArrowApp />
        </Link>
        <form onSubmit={handleSubmit}>
          <Box className={styles.BoxwordAdd}>
            <Typography variant="h6" className={styles.wordTittle}>
              Declaración jurada
            </Typography>
            {repetitiveText.map((repetitive, index) => (
              <Box key={index} className={styles.BoxwordAdd}>
                <Typography variant="h6" className={styles.wordText}>
                  {repetitive.text}
                </Typography>
                <Box className={styles.BoxSwitches}>
                  <SwitchSworn
                    checked={answers[repetitive.name] === 'si'}
                    onChange={(value) =>
                      setAnswers((prevAnswers) => ({
                        ...prevAnswers,
                        [repetitive.name]: value,
                      }))
                    }
                  />
                </Box>
              </Box>
            ))}
          </Box>

          <Box className={styles.ButtonApp}>
            <Box className={styles.BoxOfCheckbox}>
              <Checkbox required />
              <Typography variant="p" className={styles.wordText}>
                Declaro que mis respuestas fueron totalmente verdaderas y que he respondido a todas
                las preguntas con la mayor honestidad posible.
              </Typography>
            </Box>

            <ButtonApp type="submit">Continuar</ButtonApp>
          </Box>
        </form>
      </>
    </Container>
  );
};

export default SwornStatement;
