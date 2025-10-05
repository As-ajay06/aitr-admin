import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventGrantColumns } from "components/department/eventGrant/ColumnDefination";
import { MouColumns, dummyMoUData } from "components/department/mous/CoulmnDefination";

interface DepartmentState {
  tab: string;
  columns: any[];
  data: any[];
}

const initialState: DepartmentState = {
  tab: "institute",
  columns: MouColumns,
  data: dummyMoUData,
};

// Dummy column/data imports (replace with real ones)
// todo : call the other columns here

// todo : create slices for other tabs also.
const institute = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;

      switch (action.payload) {
        case "mou":
          state.columns = MouColumns;
          break;

        case "consultancy":
          state.columns = ConsutancyColumns;
          break;

        case "rndIntiatives":
          state.columns = RndInitiativesColumns;
          break;

        case "eventGrant":
          state.columns = EventGrantColumns;
          break;

        case "InstituteDocuments":
          state.columns = InstituteDocumentsColumns;
          break;  

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
  