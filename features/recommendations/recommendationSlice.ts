import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (_, { getState }) => {
    const { user } = getState() as { user: { currentUser: { token: string } | null } };
    const config = {
      headers: {
        Authorization: `Bearer ${user.currentUser?.token}`,
      },
    };
    const response = await axios.get('/api/recommendations', config);
    return response.data;
  }
);

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: {
    recommendations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recommendationSlice.reducer;