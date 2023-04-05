import { useState, useEffect } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';
import { formCreate } from '../../store/formSworn';

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
  const [buttonValidate, setButtonValidate] = useState<boolean>(true);
  const [buttonClicks, setButtonClicks] = useState<number>(0);

  const navigate = useRouter();
  const dispatch = useDispatch();

  const dataForm = {
    user: userId,
    ...answers,
  };

  const hasRequiredFields = (dataForm: {}) => {
    const requiredFields = ['alcohol', 'medicines', 'problems'];
    return requiredFields.every((field) => dataForm.hasOwnProperty(field));
  };

  const handleButtonClick = () => {
    setButtonClicks((prevClicks) => prevClicks + 1);
  };

  useEffect(() => {
    setButtonValidate(!hasRequiredFields(answers));
  }, [answers]);

  const handleSubmitSwornStatement = (event) => {
    event.preventDefault();
    if (buttonValidate) {
      return toast.error('Tienen que completar todos los campos');
    }
    dispatch(formCreate(dataForm))
      .then(() => navigate.push('/views/start-workday'))
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth={'xs'} disableGutters={true}>
      <Toaster position="top-center" reverseOrder={false} limit={3} />
      <>
        <Header />

        <form onSubmit={handleSubmitSwornStatement}>
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
              <Checkbox required disabled={buttonValidate ? true : false} />
              <Typography variant="p" className={styles.wordText}>
                Declaro que mis respuestas fueron totalmente verdaderas y que he respondido a todas
                las preguntas con la mayor honestidad posible.
              </Typography>
            </Box>

            <ButtonApp
              type="submit"
              variantButton="contained"
              disabled={buttonValidate}
              onClick={handleButtonClick}
            >
              Continuar
            </ButtonApp>
          </Box>
        </form>
      </>
    </Container>
  );
};

export default SwornStatement;
