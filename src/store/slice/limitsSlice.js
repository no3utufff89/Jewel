import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  page: 1,
  limit: 50,
  error: null,
};

const limitsSlice = createSlice({
  name: "limits",
  initialState,
  reducers: {
    increasePage: (state) => {
      state.page += 1;
      state.offset = state.limit * state.page - state.limit;
    },
    decreasePage: (state) => {
      state.page -= 1;
      state.offset = state.limit * state.page - state.limit;
    },
    handleSetPage: (state, action) => {
      state.page = action.payload;
      state.offset = state.limit * state.page - state.limit;
    },
    changeLimit: (state, action) => {
      state.limit = +action.payload;
      state.offset = state.limit * state.page - state.limit;
    },
    changeOffset: (state, action) => {
      state.offset = action.payload;
      // state.offset = state.limit * state.page - state.limit;
    },
  },
});

export const {
  changePage,
  decreasePage,
  changeLimit,
  increasePage,
  handleSetPage,
  changeOffset,
} = limitsSlice.actions;
export const limit = (state) => state.limits.limit;
export const offset = (state) => state.limits.offset;
export const page = (state) => state.limits.page;
export default limitsSlice.reducer;
