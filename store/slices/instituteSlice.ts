import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InstituteState {
  tab: string;
  columns: any[];
  data: any[];
}

const initialState: InstituteState = {
  tab: "eventGrant",
  columns: [],
  data: [],
};

// Dummy column/data imports (replace with real ones)
// todo : call the other columns herec

// todo : there is no column in the column defination of institute column

import  { ConsultancyColumn } from "components/institute/consultancy/ColumnDefination"
import  { EventGrantColumns } from "components/institute/eventGrant/ColumnDefination"
import  { EventOrganisedColumns } from "components/institute/eventOrganised/ColumnDefination"
import  { InstituteDocumentsColumns } from "components/institute/instituteDocuments/ColumnDefination"
import  { mouListColumns } from "components/institute/mou/ColumnDefination"
import  { RnDColumn } from "components/institute/rd/ColumnDefination"

// todo : there is no rd colums in column defination




const institute = createSlice({
  name: "institute",
  initialState,
  reducers: {
    
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;

      switch (action.payload) {
        case "mou":
          state.columns = mouListColumns;
          break;

        case "consultancy":
          state.columns = ConsultancyColumn;
          break;

        case "rndIntiatives":
          state.columns = RnDColumn;
          break;

        case "eventGrant":
          state.columns = EventGrantColumns;
          break;

        case "InstituteDocuments":
          state.columns = InstituteDocumentsColumns;
          break;  

        case "eventOrganised":
          state.columns = EventOrganisedColumns ;

        default:
          state.columns = [];
      }

      // clear previous data when tab changes
      state.data = [];
    },

    // ✅ new reducer to store fetched data
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
  },
});

export const { setTab, setData } = institute.actions;
export default institute.reducer;
  