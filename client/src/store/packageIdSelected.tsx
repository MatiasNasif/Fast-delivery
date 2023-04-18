import { createSlice } from '@reduxjs/toolkit';

const packageSlice = createSlice({
  name: 'package',
  initialState: '',
  reducers: {
    setPackage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPackage } = packageSlice.actions;

export default packageSlice.reducer;
