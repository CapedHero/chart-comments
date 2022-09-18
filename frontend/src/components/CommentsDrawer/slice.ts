import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { backendAPI } from "backendApi";
import { fetchChart } from "components/BarChart/slice";
import { ChartComment } from "domain/types";
import { RootState } from "store";

interface CommentsDrawerState {
  addError: string | null;
  addStatus: "idle" | "loading" | "succeeded" | "failed";
  comments: Array<ChartComment>;
  dataPointLabel: string;
  isShown: boolean;
}

export const commentsDrawerSlice = createSlice({
  name: "commentsDrawer",
  initialState: {
    addError: null,
    addStatus: "idle",
    comments: [],
    dataPointLabel: "",
    isShown: false,
  } as CommentsDrawerState,
  reducers: {
    hide: (state) => {
      state.isShown = false;
    },
    setComments: (state, action: PayloadAction<Array<ChartComment>>) => {
      state.comments = action.payload;
    },
    setDataPointLabel: (state, action: PayloadAction<string>) => {
      state.dataPointLabel = action.payload;
    },
    show: (state) => {
      state.isShown = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addChartComment.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addChartComment.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addChartComment.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.error.message || null;
      });
  },
});

const addChartComment = createAsyncThunk(
  "addChartComment",
  async (data: { commentAuthor: string; commentText: string }, { getState, dispatch }) => {
    const state = getState() as RootState;
    const response = await backendAPI.addChartComment(
      state.commentsDrawer.dataPointLabel,
      data.commentAuthor,
      data.commentText
    );
    dispatch(fetchChart());
    return {
      id: response.data.id,
      author: response.data.author,
      text: response.data.text,
    } as ChartComment;
  }
);

const actions = commentsDrawerSlice.actions;
export { addChartComment, actions as commentsDrawerActions };

export default commentsDrawerSlice.reducer;
