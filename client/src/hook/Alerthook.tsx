import React from 'react';
import { useSnackbar, OptionsObject, SnackbarKey } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface AlertProp {
  message: string;
  typeAlert: 'default' | 'error' | 'success' | 'warning' | 'info';
  showCloseButton?: boolean;
}

export const useAlert = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showAlert = (
    { message, typeAlert, showCloseButton }: AlertProp,
    options?: OptionsObject
  ) => {
    const action = showCloseButton
      ? (key: SnackbarKey) => (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )
      : undefined;

    enqueueSnackbar(message, {
      variant: typeAlert,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      style: {
        fontSize: '14px',
        color: '#fffff',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
      action,
      ...options,
    });
  };

  return showAlert;
};
