import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventGrantColumns } from "components/department/eventGrant/ColumnDefination";
import { MouColumns, dummyMoUData } from "components/department/mous/CoulmnDefination";

interface FacultyState {
    tab: string;
    columns: any[];
    data: any[];
}

const initialState: FacultyState = {
    tab: "profile",
    columns: MouColumns,
    data: dummyMoUData,
};

// Dummy column/data imports (replace with real ones)

import { FacultyProfileColumns } from "components/faculty/profile/CoulmnDefination";
import { AcedmicQualificationColumn } from "components/faculty/AcdeminQulificationDiscipline/ColumnDefination";
import { InvitedTalks } from "components/faculty/InvitedTalks/ColumnDefination";
import { BookPublicationColumns } from "components/faculty/booksChapterAuthored/ColumnDefination";
import { FacultyAwardColumns } from "components/faculty/facultyAwardAndRecognition/ColumnDefination";
import { FDPColumns } from "components/faculty/facultyDevlopmentProgram/ColumnDefination";
import { FacultyMembershipColumns } from "components/faculty/membershipInProfessionalBodies/ColumnDefination";
import { PatentGrantedColumns } from "components/faculty/patentGranted/ColumnDefination";
import { PatentColumns } from "components/faculty/patentPublished/ColumnDefination";
import { PhDScholarColumns } from "components/faculty/phdSpervision/ColumnDefination";
import { ProffesionalCertificateEarned } from "components/faculty/professionalCertificationEarned/ColumnDefination";
import { FacutlyResearchPaperPublication } from "components/faculty/researchPaperPublication/ColumnDefination";
import { ReseachProjectGuided } from "components/faculty/researchProjectGuided/ColumnDefination"




const faculty = createSlice({
    name: "faculty",
    initialState,
    reducers: {
        setTab(state, action: PayloadAction<string>) {
            state.tab = action.payload;

            switch (action.payload) {
                case "profile":
                    state.columns = FacultyProfileColumns;
                    break;

                case "reseachPaperPublications":
                    state.columns = FacutlyResearchPaperPublication;
                    break;

                case "facultyAwardAndRecognition":
                    state.columns = FacultyAwardColumns;
                    break;

                case "facultyDevlopmentProgram":
                    state.columns = FDPColumns;
                    break;

                case "patentPublished":
                    state.columns = PatentColumns;
                    break;

                case "patentGranted":
                    state.columns = PatentGrantedColumns;
                    break;
                case "proffesionalCertificateEarned":
                    state.columns = ProffesionalCertificateEarned ;
                    break;

                case "membershipInProffesionalBodies":
                    state.columns = FacultyMembershipColumns;
                    break;

                case "acadmicQualification":
                    state.columns = AcedmicQualificationColumn;
                    break;

                case "phdSpervision":
                    state.columns = PhDScholarColumns;
                    break;

                case "researchProjectGuided":
                    state.columns = ReseachProjectGuided;
                    break;

                case "invitedTalks":
                    state.columns = InvitedTalks;
                    break;

                case "booksAndChapterAuthored":
                    state.columns = BookPublicationColumns;
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
