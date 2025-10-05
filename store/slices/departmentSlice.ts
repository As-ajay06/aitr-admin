import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import all the deparment columns here
import { MouColumns, dummyMoUData } from "components/department/mous/CoulmnDefination";
import { ConsultancyColumns } from "components/department/consultancyProjects/ColumnDefination"
import { EventGrantColumns } from "components/department/eventGrant/ColumnDefination"
import { RndColumns } from "components/department/rdInitiatives/ColumnDefination"



interface DepartmentState {
  tab: string;
  columns: any[];
  data: any[];
}

const initialState: DepartmentState = {
  tab: "mou",
  columns: MouColumns,
  data: dummyMoUData,
};

// Dummy column/data imports (replace with real ones)
export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;

      switch (action.payload) {
        case "mou":
          state.columns = MouColumns;
          break;

        case "consultancyProjects":
          state.columns = ConsultancyColumns;
          break;

        case "rndIntiatives":
          state.columns = RndColumns;
          break;

        case "eventGrantReceived":
          state.columns = EventGrantColumns;
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

export const { setTab, setData } = departmentSlice.actions;
export default departmentSlice.reducer;
  