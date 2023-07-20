import productReducer from "@/services/product";
import todoReducer from "@/services/todo";
import { AnyAction, Reducer, combineReducers } from "@reduxjs/toolkit";

import { RootState } from "./store";

/**

* This code merges the existing application state (...state) from the client-side with the 
* data received from the "HYDRATE" action (...action.payload) representing the server-side 
* slice or state. The spread operator (...) combines the current state with the hydrated 
* data, effectively updating only the specific slices fetched from the server while preserving
* the rest of the client-side state. This process ensures that the state on the client-side 
* remains intact, and only the relevant data from the server is incorporated into the 
* application state.

**/

export const rootReducer: Reducer<RootState> = (
  state: RootState | undefined,
  action: AnyAction
) => {
  const reducers: Reducer<RootState> = combineReducers({
    product: productReducer,
    todo: todoReducer,
  });

  if (action.type === "HYDRATE") {
    return reducers(
      {
        ...state,
        ...action.payload,
      },
      action
    );
  }
  return reducers(state, action);
};
