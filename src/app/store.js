import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    // Add other reducers here if you have any
  },
});

export default store;
