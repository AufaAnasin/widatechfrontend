import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiResponse: null,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setApiResponse: (state, action) => {
      state.apiResponse = action.payload;
    },
  },
});

export const { setApiResponse } = invoiceSlice.actions;

export default invoiceSlice.reducer;