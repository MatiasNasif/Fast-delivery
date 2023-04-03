import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserRegister {
  fullName: string;
  email: string;
  password: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:5000';

export const getUserById = createAsyncThunk('GET_USER', () => {
  const userId: string = JSON.parse(localStorage.getItem('user') ?? '').id;
  return axios.get(`${API_URL}/users/${userId}`).then((user) => user.data);
});

export const userRegister = createAsyncThunk('USER_REGISTER', (data: UserRegister) => {
  return axios.post(`${API_URL}/users/signup`, data).then((user) => user.data);
});

export const userLogin = createAsyncThunk('USER_LOGGED', (data: UserCredentials) => {
  return axios.post(`${API_URL}/auth/login`, data).then((user) => {
    localStorage.setItem('user', JSON.stringify({ email: user.data.email, id: user.data.id }));
    return user.data;
  });
});

export const userLogout = createAsyncThunk('USER_LOGOUT', () => {
  return axios.post(`${API_URL}/auth/logout`).then(() => {
    localStorage.removeItem('user');
  });
});

export const getAllUsers = createAsyncThunk('GET_ALL_USER', () => {
  return axios.get(`${API_URL}/users`);
});

const userReducer = createReducer(null, {
  [`${getUserById.fulfilled}`]: (state, action) => action.payload,
  [`${getAllUsers.fulfilled}`]: (state, action) => action.payload,
  [`${userLogin.fulfilled}`]: (state, action) => action.payload,
  [`${userLogout.fulfilled}`]: (state, action) => null,
});

export default userReducer;
