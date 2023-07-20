import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  todo: string;
  userId: number;
  completed: boolean;
}

export interface TodoState {
  data: {
    todos: [];
    total: number;
    skip: number;
    limit: number;
  };
  isLoading: boolean;
  error: string | null;
}

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await fetch("https://dummyjson.com/todos?limit=100");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return {};
});

const initialState: TodoState = {
  data: {
    todos: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    });
  },
});

export const actions = todoSlice.actions;
export default todoSlice.reducer;
