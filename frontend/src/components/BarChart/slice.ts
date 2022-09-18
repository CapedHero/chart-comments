import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendAPI } from "backendApi";
import { Chart } from "domain/types";

interface ChartSliceState {
  data: Chart;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchError: string | null;
}

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: {
      id: "",
      dataPoints: [],
    },
    fetchStatus: "idle",
    fetchError: null,
  } as ChartSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchChart.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchChart.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.fetchError = action.error.message || null;
      });
  },
});

const fetchChart = createAsyncThunk("fetchChart", async () => {
  const response = await backendAPI.fetchChart();
  return {
    id: response.data.id,
    dataPoints: response.data.data_points.map((dataPoint) => ({
      x: dataPoint.label,
      y: dataPoint.value,
      comments: dataPoint.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        author: comment.author,
      })),
    })),
  };
});

export { fetchChart };
export default chartSlice.reducer;
