import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  fullName: string;
  email: string;
  password: string;
  admin: boolean;
  status: string;
  statusWorkday?: string;
  packages?: Package[];
}

interface UserCredentials {
  email: string;
  password: string;
}

interface Package {
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: string;
  quantity: number;
  deliveryStatus: string;
  userId: string;
}

const pathApi = 'http://localhost:5000';

export const getUserById = createAsyncThunk('GET_USER', () => {
  const userId: string = JSON.parse(localStorage.getItem('user') ?? '').id;
  return axios.get(`${pathApi}/users/${userId}`).then((user) => user.data);
});

export const userRegister = createAsyncThunk('USER_REGISTER', (data: User) => {
  return axios.post(`${pathApi}/users/signup`, data).then((user) => user.data);
});

export const userLogin = createAsyncThunk('USER_LOGGED', (data: UserCredentials) => {
  return axios.post(`${pathApi}/auth/login`, data).then((user) => {
    localStorage.setItem('user', JSON.stringify({ email: user.data.email, id: user.data.id }));
    return user.data;
  });
});

export const userLogout = createAsyncThunk('USER_LOGOUT', () => {
  return axios.post(`${pathApi}/auth/logout`).then(() => {
    localStorage.removeItem('user');
  });
});

export const getAllUsers = createAsyncThunk('GET_ALL_USER', () => {
  return axios.get(`${pathApi}/users`);
});

const userReducer = createReducer(null, {
  [`${getUserById.fulfilled}`]: (state, action) => action.payload,
  [`${getAllUsers.fulfilled}`]: (state, action) => action.payload,
  [`${userLogin.fulfilled}`]: (state, action) => action.payload,
});

export default userReducer;
