import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchList = createAsyncThunk("listpanel/fetchList", async () => {
  const response = await fetch("http://localhost:3000/hn/topstories");
  const data = await response.json();
  return data;
});

const listpanelSlice = createSlice({
  name: "listpanel",
  initialState: {
    item: [],
    activeItem: "none",
    activeItemId: null,
  },
  reducers: {
    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload;
      state.item.forEach((i) => {
        if (i.id === action.payload) {
          state.activeItem = i;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchList.fulfilled, (state, action) => {
        state.item = Object.values(action.payload);
      })
      .addCase(fetchList.rejected, (state, action) => {
        console.log("rejected", action.error);
      })
      .addCase(fetchList.pending, (state, action) => {
        console.log("pending");
      });
  },
});

export const { setActiveItemId } = listpanelSlice.actions;

export default listpanelSlice.reducer;
