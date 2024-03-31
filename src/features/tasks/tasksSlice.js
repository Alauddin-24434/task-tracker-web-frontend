import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Async thunk action creator to fetch tasks from the database
export const fetchTasksAsync = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    try {
      const response = await axios.get('https://task-tracker-backend-iota.vercel.app/tasks');
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
      const response = await axios.post('https://task-tracker-backend-iota.vercel.app/tasks', newTaskData);
      if (response.status === 201) {
        toast.success('Task added successfully'); // Display success toast
        return response.data; // Return the newly created task
      } else {
        toast.error('Failed to add task: Unexpected status code'); // Display error toast for unexpected status code
        throw new Error('Unexpected status code');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 404) {
          toast.error('Failed to add task: Not found'); // Display error toast for 404 status code
        } else if (error.response.status === 500) {
          toast.error('Failed to add task: Server error'); // Display error toast for 500 status code
        } else {
          toast.error('Failed to add task: Network error'); // Display error toast for other network errors
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('Failed to add task: No response from server'); // Display error toast for no response
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error('Failed to add task: Request error'); // Display error toast for request setup error
      }
      // console.log(error); // Commented out console.log
      throw new Error(error.message);
    }
  }
);

// Async thunk action creator to delete a task from the database
export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    try {
      await axios.delete(`https://task-tracker-backend-iota.vercel.app/tasks/${taskId}`);
      toast.success('Task deleted successfully'); // Display success toast
      return taskId; // Return the ID of the deleted task
    } catch (error) {
      toast.error('Failed to delete task'); // Display error toast
      throw new Error(error.message);
    }
  }
);

// Async thunk action creator to update a task in the database
export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updatedTaskData }) => {
    try {
      const response = await axios.put(`https://task-tracker-backend-iota.vercel.app/tasks/${taskId}`, updatedTaskData);
      toast.success('Task updated successfully'); // Display success toast
      return response.data; // Return the updated task data
    } catch (error) {
      toast.error('Failed to update task'); // Display error toast
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
      // Add cases for handling async actions
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload; // Update tasks array with fetched data
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload); // Add the newly created task to the tasks array
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted task from the tasks array
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
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
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectTasks = (state) => state.tasks.tasks;
export const selectTaskStatus = (state) => state.tasks.status;
export const selectError = (state) => state.tasks.error;

export default tasksSlice.reducer;
