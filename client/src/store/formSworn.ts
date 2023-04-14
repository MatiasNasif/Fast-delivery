import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

interface dataForm {
  alcohol: string;
  medicines: string;
  problems: string;
  user: string;
}
const urlApi: string | undefined = process.env.NEXT_PUBLIC_LOCAL_API_KEY;

export const formCreate = createAsyncThunk('FORMSWORN_CREATE', (dataForm: dataForm) => {
  return axios.post(`${urlApi}/formsworn/createforms`, dataForm).then((form) => {
    return form.data;
  });
});
export const getFormById = createAsyncThunk('FORMSWORN_GET_FORM_BY_ID', (user: string) => {
  return axios.get(`${urlApi}/formsworn/${user}`).then((form) => form.data);
});

const formSwornReduce = createReducer({} as dataForm, {
  [`${formCreate.fulfilled}`]: (state, action) => action.payload,
  [`${getFormById.fulfilled}`]: (state, action) => (state = action.payload),
});

export default formSwornReduce;
