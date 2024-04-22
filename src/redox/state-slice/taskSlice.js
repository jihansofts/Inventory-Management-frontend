import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    newAll: [],
    completedAll: [],
    progressAll: [],
    canceledAll: [],
  },
  reducers: {
    SetNewTask: (state, action) => {
      state.newAll = action.payload;
    },
    SetCompletedTask: (state, action) => {
      state.completedAll = action.payload;
    },
    SetProgressTask: (state, action) => {
      state.progressAll = action.payload;
    },
    SetCanceledTask: (state, action) => {
      state.canceledAll = action.payload;
    },
  },
});

export const {
  SetNewTask,
  SetCompletedTask,
  SetProgressTask,
  SetCanceledTask,
} = taskSlice.actions;
export default taskSlice.reducer;
