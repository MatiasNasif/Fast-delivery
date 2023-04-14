import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
  name: 'date',
  initialState: '',
  reducers: {
    setDate: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;
