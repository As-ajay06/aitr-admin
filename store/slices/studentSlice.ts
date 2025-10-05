import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventGrantColumns } from "components/department/eventGrant/ColumnDefination";
import { MouColumns, dummyMoUData } from "components/department/mous/CoulmnDefination";

interface DepartmentState {
  tab: string;
  columns: any[];
  data: any[];
}

const initialState: DepartmentState = {
  tab: "profile",
  columns: MouColumns,
  data: dummyMoUData,
};

// Dummy column/data imports (replace with real ones)
// todo : call the other columns here

// todo : create slices for other tabs also.
const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;

      switch (action.payload) {
        case "profile":
          state.columns = MouColumns;
          break;

        case "certification":
          state.columns = CertificationColumns;
          break;

        case "technicalNonTechnical":
          state.columns = TechnicalNonTechnicalColumns;
          break;

        case "placement":
          state.columns = PlacementColumns;
          break;

        case "internship":
          state.columns = InternshipColumns;
          break;
          
        case "reserachPaper":
          state.columns = ReserachPaperColumns;
          break;

        case "spots":
          state.columns = SpotsColumns;
          break;

        case "extraCurricular":
          state.columns = ExtraCurricularColumns;
          break;

        case "startup":
          state.columns = StartupColumns;
          break;

        case "hackathons":
          state.columns = HackathonsColumns;
          break;
          
        case "higherStudies":
          state.columns = HigherStudiesColumns;
          break;

        case "professionalMembership":
          state.columns = ProfessionalMembershipColumns;
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

export const { setTab, setData } = student.actions;
export default student.reducer;
