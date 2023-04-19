import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';
import { enqueueSnackbar, useSnackbar } from 'notistack';

interface UserRegister {
  fullName: string;
  email: string;
  password: string;
}
interface User {
  email: string;
  id: string;
  fullName: string;
  admin: boolean;
}

interface UserCredentials {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:5000';

export const setPersistence = createAsyncThunk('SET_PERSISTENCIA', () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
});

export const getUserById = createAsyncThunk('GET_USER', () => {
  const userId: string = JSON.parse(localStorage.getItem('user') ?? '').id;
  return axios.get(`${API_URL}/users/${userId}`).then((user) => user.data);
});

export const userRegister = createAsyncThunk(
  'USER_REGISTER',
  async (data: { data: UserRegister; enqueueSnackbar: Function; navigate: Function }) => {
    try {
      console.log(data.user);
      const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.data),
      });
      if (!response.ok) {
        throw new Error('Error al registrarse');
      }
      const user = await response.json();
      data.enqueueSnackbar('Usuario Creado', {
        variant: 'success',
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
      data.navigate.push('/');
      return user;
    } catch (error) {
      console.log(error);
      data.enqueueSnackbar('Usuario Existente', {
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
    }
  }
);

export const userLogin = createAsyncThunk<
  User,
  { data: UserCredentials; enqueueSnackbar: Function; setAnimationLogin: Function }
>('USER_LOGGED', async ({ data, enqueueSnackbar, setAnimationLogin }) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        enqueueSnackbar('Contraseña incorrecta', {
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
      }
      if (response.status === 404) {
        enqueueSnackbar('Usuario incorrecto o no existente', {
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
      }
      throw new Error('Error en la respuesta');
    }
    const responseData = await response.json();
    const user: User = {
      email: responseData.email,
      id: responseData.id,
      fullName: responseData.fullName,
      admin: responseData.admin,
    };
    setAnimationLogin(true);
    localStorage.setItem('user', JSON.stringify(user));
    enqueueSnackbar(`Bienvenido/a  ${user.fullName} `, {
      variant: 'success',
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
    return user;
  } catch (error) {
    console.log(error);
  }
});

export const userLogout = createAsyncThunk('USER_LOGOUT', () => {
  return axios.post(`${API_URL}/auth/logout`).then(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('switchState');
  });
});

export const getAllUsers = createAsyncThunk('GET_ALL_USER', () => {
  return axios.get(`${API_URL}/users`);
});

const userReducer = createReducer(
  setPersistence.fulfilled({}), // valor inicial
  {
    [`${getUserById.fulfilled}`]: (state, action) => action.payload,
    [`${getAllUsers.fulfilled}`]: (state, action) => action.payload,
    [`${userLogin.fulfilled}`]: (state, action) => action.payload,
    [`${setPersistence.fulfilled}`]: (state, action) => {
      return action.payload;
    },
    [`${userLogout.fulfilled}`]: (state, action) => {
      return {};
    },
  }
);

export default userReducer;
