import { useState, useEffect, ReactEventHandler } from 'react';
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
import { formCreate } from '../../store/formSworn';
import { setPersistence } from '@/store/user';
import { useSnackbar } from 'notistack';

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

  const [answers, setAnswers] = useState({});
  const [buttonValidate, setButtonValidate] = useState<boolean>(true);
  const [buttonClicks, setButtonClicks] = useState<number>(0);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPersistence());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  console.log(user.id + 'EL USER EN EL FORMULARIO');
  const dataForm = {
    user: user.id,
    ...answers,
  };

  const hasRequiredFields = (dataForm: {}) => {
    const requiredFields = ['alcohol', 'medicines', 'problems'];
    return requiredFields.every((field) => dataForm.hasOwnProperty(field));
  };

  const handleButtonClick = () => {
    setButtonClicks((prevClicks) => prevClicks + 1);
  };

  const handleButtonClickDesactivate = () => {
    return enqueueSnackbar('Tiene que completar todos los campos', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      style: {
        fontSize: '16px',
        color: '#fffff',
        fontWeight: 'bold',
      }, 
    });
  };
  useEffect(() => {
    setButtonValidate(!hasRequiredFields(answers));
  }, [answers]);

  const handleSubmitSwornStatement = (event: ReactEventHandler) => {
    event.preventDefault();
    dispatch(formCreate(dataForm))
      .then(() => navigate.push('/views/start-workday'))
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth={'xs'} disableGutters={true}>
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
              {buttonValidate ? (
                <span className={styles.BoxOfCheckbox} onClick={handleButtonClickDesactivate}>
                  <Checkbox required disabled={true} />
                </span>
              ) : (
                <Checkbox required disabled={false} />
              )}

              <Typography variant="p" className={styles.wordText}>
                Declaro que mis respuestas fueron totalmente verdaderas y que he respondido a todas
                las preguntas con la mayor honestidad posible.
              </Typography>
            </Box>
            {buttonValidate ? (
              <span onClick={handleButtonClickDesactivate}>
                <ButtonApp
                  typeofButton="submit"
                  variantButton="contained"
                  isDisable={true}
                  onClick={handleButtonClick}
                >
                  No Puedes Continuar
                </ButtonApp>
              </span>
            ) : (
              <ButtonApp
                typeofButton="submit"
                variantButton="contained"
                isDisable={false}
                onClick={handleButtonClick}
              >
                Continuar
              </ButtonApp>
            )}
          </Box>
        </form>
      </>
    </Container>
  );
};

export default SwornStatement;
