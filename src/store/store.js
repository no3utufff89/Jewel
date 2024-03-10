import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice.js";
import brandsReducer from "./slice/brandSlice.js";
// import filterReducer from "./slice/filterSlice.js";
import limitsReducer from "./slice/limitsSlice.js";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    brands: brandsReducer,
    // filter: filterReducer,
    limits: limitsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
