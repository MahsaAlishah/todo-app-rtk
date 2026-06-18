import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// getTodos, addtodos, toggleTodos, removeTodos

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAsyncTodos = createAsyncThunk(
  "todo/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncTodos = createAsyncThunk(
  "todo/addAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", {
        title: payload.title,
        id: Date.now(),
        completed: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todo/toggleAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/todos/${payload.id}`, {
        completed: !payload.completed,
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodos = createAsyncThunk(
  "todo/deleteAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: { loading: false, todos: [], error: "" },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title, //{title:"todo one"}
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (todo) => todo.id === Number(action.payload.id)
      );
      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== Number(action.payload.id)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAsyncTodos.pending, (state) => {
      (state.loading = true), (state.todos = []), (state.error = "");
    });
    builder.addCase(getAsyncTodos.fulfilled, (state, action) => {
      (state.loading = false),
        (state.todos = action.payload),
        (state.error = "");
    });
    builder.addCase(getAsyncTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    });
    builder.addCase(addAsyncTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAsyncTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    });
    builder.addCase(toggleAsyncTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      state.error = "";
    });
    builder.addCase(deleteAsyncTodos.fulfilled, (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    });
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;

// todo => add, toggle, delete (local)
// json-server => remote state
