import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchList = createAsyncThunk("itemlist/fetchList", async () => {
  const response = await fetch("http://localhost:3000/itemStatuses");
  const data = await response.json();
  return data;
});

const itemlistSlice = createSlice({
  name: "itemlist",
  initialState: {
    list: [],
  },
  extraReducers(builder) {
    builder
      .addCase(fetchList.fulfilled, (state, action) => {
        state.list = Object.values(action.payload);
      })
      .addCase(fetchList.rejected, (state, action) => {
        console.log("rejected", action.error);
      })
      .addCase(fetchList.pending, (state, action) => {
        console.log("pending");
      });
  },
});

export default itemlistSlice.reducer;
