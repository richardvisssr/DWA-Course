import { createSlice } from "@reduxjs/toolkit";

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    color: "orange",
    listSize: 42,
    viewPanel: true,
  },
  reducers: {
    changeColor: (state, action) => ({ ...state, color: action.payload }),
    switchPanelView: (state) => ({ ...state, viewPanel: !state.viewPanel }),
    changeListSize: (state, action) => ({
      ...state,
      listSize: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { changeColor, switchPanelView, changeListSize } = preferencesSlice.actions;

export default preferencesSlice.reducer;
