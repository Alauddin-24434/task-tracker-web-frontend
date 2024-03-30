import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk action creator to fetch tasks from the database
export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      return response.data; // Return the fetched tasks data
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk action creator to add a new task to the database
export const addTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (newTaskData) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', newTaskData);
      return response.data; // Return the newly created task
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk action creator to delete a task from the database
export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      return taskId; // Return the ID of the deleted task
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Async thunk action creator to update a task in the database
export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updatedTaskData }) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTaskData);
      return response.data; // Return the updated task data
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      // You can add other reducers here if needed
    },
    extraReducers: (builder) => {
      builder
        // Add case for handling fetchTasksAsync.pending
        .addCase(fetchTasksAsync.pending, (state) => {
          state.status = 'loading';
        })
        // Add case for handling fetchTasksAsync.fulfilled
        .addCase(fetchTasksAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.tasks = action.payload; // Update tasks array with fetched data
        })
        // Add case for handling fetchTasksAsync.rejected
        .addCase(fetchTasksAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Add case for handling addTaskAsync.fulfilled
        .addCase(addTaskAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.tasks.push(action.payload); // Add the newly created task to the tasks array
        })
        // Add case for handling addTaskAsync.rejected
        .addCase(addTaskAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Add case for handling deleteTaskAsync.fulfilled
        .addCase(deleteTaskAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Remove the deleted task from the tasks array
          state.tasks = state.tasks.filter(task => task._id !== action.payload);
        })
        // Add case for handling deleteTaskAsync.rejected
        .addCase(deleteTaskAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        // Add case for handling updateTaskAsync.fulfilled
        .addCase(updateTaskAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // Update the task in the tasks array
          state.tasks = state.tasks.map(task => {
            if (task._id === action.payload._id) {
              return action.payload; // Replace the task with the updated task data
            }
            return task;
          });
        })
        // Add case for handling updateTaskAsync.rejected
        .addCase(updateTaskAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  

export default tasksSlice.reducer;
