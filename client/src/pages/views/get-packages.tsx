import { Container, Box, Typography, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import styles from '../../styles/GetPackages.module.css';
import Header from '../../commons/header';
import ButtonApp from '../../commons/buttonApp';
import ArrowApp from '../../commons/arrowApp';
import { requestGetPackages, Package } from '@/utils/fakerGetPackages';
import React from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function GetPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageCounts, setPackageCounts] = useState<{ [key: string]: number }>({});

  const uniqueAddresses = new Set(packages.map((pack) => pack.address));
  useEffect(() => {
    requestGetPackages(12).then((packs) => {
      setPackages(packs);
      // Inicializar el contador de paquetes por dirección en 0
      const counts = Array.from(uniqueAddresses).reduce((acc, address) => {
        acc[address] = 0;
        return acc;
      }, {} as { [key: string]: number });
      setPackageCounts(counts);
    });
  }, []);

  // Agrupar los paquetes por dirección
  const packagesByAddress = packages.reduce((acc, pack) => {
    if (!acc[pack.address]) {
      // Si todavía no hay un arreglo para esta dirección, se crea uno vacío
      acc[pack.address] = [];
    }

    // Se agrega el paquete al arreglo correspondiente
    acc[pack.address].push(pack);
    return acc;
  }, {} as { [key: string]: Package[] });

  return (
    <Container maxWidth={'xs'} disableGutters={true}>
      <>
        <Header />
        <ArrowApp />

        <Box className={styles.boxGetAndHowMany}>
          <Box>
            <Typography className={styles.wordGet} variant="h6">
              Obtener paquetes
            </Typography>
            <Typography className={styles.wordHowMany}>
              ¿Cuántos paquetes más vas a repartir hoy?
            </Typography>
          </Box>
        </Box>
        {/* Recorrer el conjunto de direcciones únicas */}
        {Array.from(uniqueAddresses).map((address) => {
          // Filtrar los paquetes que corresponden a esta dirección
          const packagesForAddress = packages.filter((pack) => pack.address === address);
          return (
            <>
              <Box sx={{ display: 'flex' }}>
                <Checkbox
                  {...label}
                  defaultChecked
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    marginLeft: '10%',
                    marginTop: '2%',
                  }}
                  color="info"
                />
                <Box>
                  <Typography ml={2} variant="subtitle1" className={styles.boxAddress}>
                    {address}
                  </Typography>
                  <Box className={styles.boxContainIcons}>
                    <Button
                      variant="contained"
                      className={styles.buttonRemove}
                      onClick={() => {
                        setPackageCounts((prevCounts) => ({
                          ...prevCounts,
                          [address]: Math.max(prevCounts[address] - 1, 0),
                        }));
                      }}
                    >
                      <RemoveIcon sx={{ color: 'black' }} />
                    </Button>
                    {packageCounts[address]}
                    <Button
                      variant="contained"
                      className={styles.buttonAdd}
                      onClick={() => {
                        setPackageCounts((prevCounts) => ({
                          ...prevCounts,
                          [address]: Math.min(prevCounts[address] + 1, packagesForAddress.length),
                        }));
                      }}
                    >
                      <AddIcon sx={{ color: 'black' }} />
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ m: '5%' }} />
            </>
          );
        })}
        <Box className={styles.boxContainer}>
          <ButtonApp>Iniciar Jornada</ButtonApp>
        </Box>
      </>
    </Container>
  );
}
