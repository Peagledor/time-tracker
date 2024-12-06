// src/store/slices/timeEntriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface TimeEntry {
  id?: number;
  client_id: number;
  start_time: string;
  end_time: string | null;
  description: string;
}

interface TimeEntriesState {
  entries: TimeEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TimeEntriesState = {
  entries: [],
  status: 'idle',
  error: null
};

export const fetchTimeEntries = createAsyncThunk(
  'timeEntries/fetchAll',
  async () => {
    const response = await axios.get('http://localhost:3001/api/time-entries');
    return response.data;
  }
);

export const addTimeEntry = createAsyncThunk(
  'timeEntries/add',
  async (entry: Omit<TimeEntry, 'id'>) => {
    const response = await axios.post('http://localhost:3001/api/time-entries', entry);
    return response.data;
  }
);

const timeEntriesSlice = createSlice({
  name: 'timeEntries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTimeEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchTimeEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addTimeEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      });
  },
});

export default timeEntriesSlice.reducer;