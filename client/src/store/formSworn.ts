import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

interface dataForm {
  alcohol: string;
  medicines: string;
  problems: string;
  user: string;
}
const API_URL = 'http://localhost:5000';

export const formCreate = createAsyncThunk('FORMSWORN_CREATE', (dataForm: dataForm) => {
  return axios.post(`${API_URL}/formsworn/createforms`, dataForm).then((form) => form.data);
});

export const getFormById = createAsyncThunk('FORMSWORN_GET_FORM_BY_ID', (userId: string) => {
  return axios.get(`${API_URL}/formsworn/${userId}`).then((form) => form.data);
});

const formSwornReduce = createReducer({} as dataForm, {
  [`${formCreate.fulfilled}`]: (state, action) => action.payload,
  [`${getFormById.fulfilled}`]: (state, action) => action.payload,
});

export default formSwornReduce;
