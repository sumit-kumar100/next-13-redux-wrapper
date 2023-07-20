import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductState {
  data: {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  };
  isLoading: boolean;
  error: string | null;
}

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return {};
  }
);

const initialState: ProductState = {
  data: {
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data = action.payload;
      }
    );
  },
});

export const actions = productSlice.actions;
export default productSlice.reducer;
