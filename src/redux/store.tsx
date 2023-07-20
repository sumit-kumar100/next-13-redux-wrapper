import { ProductState } from "@/services/product";
import { TodoState } from "@/services/todo";
import {
  AnyAction,
  Store,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";

import { rootReducer } from "./rootReducer";

export type RootState = {
  product: ProductState;
  todo: TodoState;
};

export type RootDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const store: Store<RootState> = configureStore({
  reducer: rootReducer,
});
