import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filterData, getItems } from "../../api/api";

const initialState = {
  params: [],
  products: [],
  status: "idle",
  error: null,
  isActive: false,
};

export const fetchFiltredData = createAsyncThunk(
  "filter/getFiltredData",
  async (ids) => {
    try {
      // const ids = await filterData(params);
      const responce = await getItems(ids);
      return responce;
    } catch (error) {
      console.log(error.message);
      throw error.response.data;
    }
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    activateFilter: (state) => {
      state.isActive = !state.isActive;
    },
    clearFilterParams: (state) => {
      state.params = [];
      state.products = [];
    },
    changeParams: (state, action) => {
      const elem = state.params.find((el) => el === action.payload);
      if (!elem) {
        state.params = [...state.params, action.payload];
      } else {
        const index = state.params.indexOf(action.payload);
        state.params.splice(index, 1);
        state.params = [...state.params];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltredData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFiltredData.fulfilled, (state, action) => {
        state.status = "done";
        state.products = [...action.payload];
      })
      .addCase(fetchFiltredData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { activateFilter, changeParams, clearFilterParams } =
  filterSlice.actions;
export const isActive = (state) => state.filter.isActive;
export const params = (state) => state.filter.params;
export const filtred = (state) => state.filter.products;

export default filterSlice.reducer;
