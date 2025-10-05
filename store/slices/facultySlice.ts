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
const faculty = createSlice({
    name: "faculty",
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;

            switch (action.payload) {
                case "profile":
                    state.columns = ProfileColumns;
                    break;

                case "reseachPaperPublications":
                    state.columns = ReseachPaperPublicationsColumns;
                    break;

                case "facultyAwardAndRecognition":
                    state.columns = FacultyAwardAndRecognitionColumns;
                    break;

                case "patentPublished":
                    state.columns = PatentPublishedColumns;
                    break;

                case "patentGranted":
                    state.columns = PatentGrantedColumns;
                    break;
                case "proffesionalCertificateEarned":
                    state.columns = ProffesionalCertificateEarnedColumns;
                    break;

                case "membershipInProffesionalBodies":
                    state.columns = MembershipInProffesionalBodiesColumns;
                    break;

                case "phdSpervision":
                    state.columns = PhdSpervisionColumns;
                    break;

                case "invitedTalks":
                    state.columns = InvitedTalksColumns;
                    break;

                case "booksAndChapterAuthored":
                    state.columns = BooksAndChapterAuthoredColumns;
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

export const { setTab, setData } = faculty.actions;
export default faculty.reducer;
