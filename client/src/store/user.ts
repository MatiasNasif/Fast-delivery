import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

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
  photo?: string;
  status?: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export const setPersistence = createAsyncThunk('SET_PERSISTENCIA', async () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : {};
});

export const getUserById = createAsyncThunk('GET_USER', async () => {
  const userId: string = JSON.parse(localStorage.getItem('user') ?? '').id;
  const response = await fetch(`${API_URL}/users/${userId}`);
  return response.json();
});

export const userRegister = createAsyncThunk(
  'USER_REGISTER',
  async (data: {
    data: UserRegister;
    showAlert: Function;
    navigate: Function;
    setAnimationLogin: Function;
    setIsLoading: Function;
  }) => {
    try {
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

      data.showAlert(
        { message: 'Usuario creado', typeAlert: 'success', showCloseButton: true },
        { autoHideDuration: 3000 }
      );
      data.setAnimationLogin(true);
      data.navigate.push('/');
      data.setIsLoading(true);
      return user;
    } catch (error) {
      data.showAlert(
        { message: 'Usuario existente', typeAlert: 'error', showCloseButton: true },
        { autoHideDuration: 3000 }
      );
    }
  }
);

export const userLogin = createAsyncThunk<
  User,
  {
    data: UserCredentials;
    showAlert: Function;
    setAnimationLogin: Function;
    setLoginFailed: Function;
    setIsLoading: Function;
  },
  { rejectValue: string }
>(
  'USER_LOGGED',
  async ({ data, showAlert, setAnimationLogin, setIsLoading }, { rejectWithValue }) => {
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
          showAlert({
            message: 'Contraseña incorrecta',
            typeAlert: 'error',
            showCloseButton: true,
          });
        }
        if (response.status === 404) {
          showAlert({
            message: 'Usuario incorrecto o no existente',
            typeAlert: 'error',
            showCloseButton: true,
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
        photo: responseData.photo,
        status: responseData.status,
      };
      setAnimationLogin(true);
      setIsLoading(true);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error al iniciar sesión');
    }
  }
);

export const userLogout = createAsyncThunk('USER_LOGOUT', async () => {
  await fetch(`${API_URL}/auth/logout`, { method: 'POST' });
  localStorage.removeItem('user');
  localStorage.removeItem('switchState');
});

export const getAllUsers = createAsyncThunk('GET_ALL_USER', () => {
  return fetch(`${API_URL}/users`, { method: 'GET' });
});

export const updateUserById = createAsyncThunk(
  'UPDATE_USER',
  async (payload: { userId: string; photo: string }) => {
    const { userId, photo } = payload;
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photo }),
    });
    return response.json();
  }
);

const userReducer = createReducer(null, {
  [`${getUserById.fulfilled}`]: (state, action) => action.payload,
  [`${getAllUsers.fulfilled}`]: (state, action) => action.payload,
  [`${userLogin.fulfilled}`]: (state, action) => action.payload,
  // [`${setPersistence.fulfilled}`]: (state, action) => {
  //   return action.payload;
  // },
  [`${userLogout.fulfilled}`]: (state, action) => {
    return {};
  },
  [`${updateUserById.fulfilled}`]: (state, action) => action.payload,
});

export default userReducer;
