import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MouColumns } from "components/department/mous/CoulmnDefination";

interface StudentState {
  tab: string;
  columns: any[];
  data: any[];
}

const initialState: StudentState = {
  tab: "profile",
  columns: MouColumns,
  data: [],
};

// Dummy column/data imports (replace with real ones)
// todo : call the other columns here

import {ProjectColumns} from "components/student/capstoneProject/ColumnDefination";
import {StudentCertificateColumns} from "components/student/cerfication/ColumnDefination";
import {StudentExtraCurricular} from "components/student/extraCurricular/ColumnDefination";
import {HackathonColumns} from "components/student/hackathons/ColumnDefination";
import {StudentHigherStudies} from "components/student/higherStudies/ColumnDefination";
import {StudentInternshipColumns} from "components/student/internship/ColumnDefination";
import {StudentPlacementColumns} from "components/student/placement/ColumnDefination";
import {StudentMembershipColumns} from "components/student/professionalMemberships/ColumnDefination";
import {StudentResearchPaperColumns} from "components/student/researchPaper/ColumnDefination";
import {StudentSportsEventColumns} from "components/student/sports/ColumnDefination";
import {StartupColumns} from "components/student/startups/ColumnDefination";
import {StudentProfileColumns} from "components/student/studentProfile/ColumnDefination";
import {StudentTechinalNonTechinalColumn} from "components/student/technicalNonTeachnical/ColumnDefination";




const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<string>) {
      state.tab = action.payload;

      switch (action.payload) {
        case "profile":
          state.columns = StudentProfileColumns;
          break;

        case "certification":
          state.columns = StudentCertificateColumns;
          break;

        case "technicalNonTechnical":
          state.columns = StudentTechinalNonTechinalColumn;
          break;

        case "placement":
          state.columns = StudentPlacementColumns;
          break;

        case "internship":
          state.columns = StudentInternshipColumns;
          break;
          
        case "reserachPaper":
          state.columns = StudentResearchPaperColumns;
          break;

        case "spots":
          state.columns = StudentSportsEventColumns;
          break;

        case "extraCurricular":
          state.columns = StudentExtraCurricular;
          break;

        case "project/capstone":
          state.columns = ProjectColumns;
          break;
          
        case "startup":
          state.columns = StartupColumns;
          break;

        case "hackathons":
          state.columns = HackathonColumns;
          break;
          
        case "higherStudies":
          state.columns = StudentHigherStudies;
          break;

        case "professionalMembership":
          state.columns = StudentMembershipColumns;
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
