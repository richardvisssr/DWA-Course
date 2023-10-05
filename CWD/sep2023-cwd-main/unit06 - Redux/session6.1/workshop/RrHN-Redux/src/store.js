import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./reducers/preferences.reducer";
import itemlist from "./reducers/itemlist.reducers";
import listpanel from "./reducers/listpanel.reducers";

export default configureStore({
  reducer: {
    preferences: preferencesReducer,
    itemlist: itemlist,
    listpanel: listpanel,
  },
});
