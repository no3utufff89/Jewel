import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../../api/api";

const initialState = {
  brands: [],
  status: "idle",
  error: null,
};

export const fetchBrands = createAsyncThunk("brands/getBrands", async () => {
  try {
    const responce = await getBrands();
    return responce;
  } catch (error) {
    console.log(error.message);
    throw error.response.data;
  }
});

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "done";
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandsSlice.reducer;
export const brandsData = (state) => state.brands.brands;
