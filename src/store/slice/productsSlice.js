import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIds, getItems, searchData } from "./../../api/api";

const initialState = {
  products: [],
  filtredProducts: [],
  slicedProducts: [],
  params: [],
  isActive: false,
  activeSearch: false,
  status: "idle",
  error: null,
  filter: false,
};
// Получение товаров без фильтра
export const fetchProducts = createAsyncThunk(
  "products/getProducts",
  async (params, { getState }) => {
    const currentLimit = getState().limits.limit;
    const currentOffset = getState().limits.offset;
    const currentPage = getState().limits.page;
    const currentProducts = getState().products.products;
    const { limit } = params;
    try {
      const ids = await getIds(limit, currentOffset);
      let responce = await getItems(ids);
      responce = [...currentProducts, ...responce];
      // return [...new Set(responce.data.result)];
      return responce;
    } catch (error) {
      console.log(error.message);
      throw error.response.data;
    }
  }
);

// Получение товаров с фильтром
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

export const fetchSearchData = createAsyncThunk(
  "filter/search",
  async (searchParams) => {
    try {
      const searchIds = await searchData(searchParams);
      let responce = await getItems(searchIds);
      return responce;
    } catch (error) {
      console.log(error.message);
      throw error.response.data;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sliceProducts: (state, action) => {
      state.products = state.products.slice(0, action.payload);
    },
    sliceFiltredProducts: (state, action) => {
      state.filtredProducts = state.filtredProducts.slice(0, action.payload);
    },
    activateFilter: (state) => {
      state.isActive = !state.isActive;
    },
    activateSearch: (state) => {
      state.activeSearch = !state.activeSearch;
      state.filtredProducts = [];
    },
    clearFilterParams: (state) => {
      state.params = [];
      state.filtredProducts = [];
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
      // Получение товаров без фильтра
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "done";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Получение товаров с фильтром
      .addCase(fetchFiltredData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFiltredData.fulfilled, (state, action) => {
        state.status = "done";
        state.filtredProducts = [...action.payload];
      })
      .addCase(fetchFiltredData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Получение результатов поиска товара
      .addCase(fetchSearchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchData.fulfilled, (state, action) => {
        state.status = "done";
        state.filtredProducts = action.payload;
      })
      .addCase(fetchSearchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const {
  sliceProducts,
  activateFilter,
  activateSearch,
  changeParams,
  clearFilterParams,
} = productsSlice.actions;
export const productsData = (state) => state.products.products;
export const status = (state) => state.products.status;
export const isActive = (state) => state.products.isActive;
export const isActiveSearch = (state) => state.products.activeSearch;
export const params = (state) => state.products.params;
export const filtred = (state) => state.products.filtredProducts;
