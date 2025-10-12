// import node module libraries
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

//import required reducers
import appReducer from "./slices/appSlice";

import departmentReducer from "./slices/departmentSlice"
import facultyReducer from "./slices/facultySlice"
import instituteReducer from "./slices/instituteSlice"
import studentReducer from "./slices/studentSlice"

// importing reducers according to the table

// Department
import consultancyReducer from "../app/api/redux/department/consultancySlice" 
import eventGrantReducer from "../app/api/redux/department/eventGrantSlice"
import mouReducer from "../app/api/redux/department/mouSlice"
import rndInitiativesReducers from "../app/api/redux/department/rndInitiativesSlice"

// faculty
import academicQualificationDiscipline from "../app/api/redux/faculty/academicQualificationDiscipline"
import booksAndChapterAuthored from "../app/api/redux/faculty/booksChaptersAuthored"
import facultyAwarsAndRecognitions from "../app/api/redux/faculty/facultyAwarsAndRecognitions"
import facultyDevlopmentProgram from "../app/api/redux/faculty/facultyDevlopmentProgram"
import invitedTalks from "../app/api/redux/faculty/invitedTalks"
import membershipInProffesionalBodies from "../app/api/redux/faculty/membershipInProffesionalBodies"
import patentGranted from "../app/api/redux/faculty/patentGranted"
import patentPublished from "../app/api/redux/faculty/patentPublished"
import phdSupervision from "../app/api/redux/faculty/phdSupervision"
import professionalCertificateEarned from "../app/api/redux/faculty/professionalCertificateEarned"
import facultyProfile from "../app/api/redux/faculty/profile"
import facultyresearchPaper from "../app/api/redux/faculty/researchPaper"
import researchPaperGuided from "../app/api/redux/faculty/researchPaperGuided"

//institute
import instituteConsultancy from "../app/api/redux/institute/consultancy"
import instituteEventGrant from "../app/api/redux/institute/eventGrant"
import instituteEventOrganised from "../app/api/redux/institute/eventOrganised"
import instituteDocuments from "../app/api/redux/institute/instituteDocuments"
import instituteMou from "../app/api/redux/institute/mou"
import instituteRnd from "../app/api/redux/institute/rnd"

//student
import certificate from "../app/api/redux/student/certificate"
import extraCurricular from "../app/api/redux/student/extraCurricular"
import hackathon from "../app/api/redux/student/hackathon"
import higherStudies from "../app/api/redux/student/higherStudies"
import internship from "../app/api/redux/student/internship"
import placement from "../app/api/redux/student/placement"
import professionalMemberships from "../app/api/redux/student/professionalMemberships"
import studentProfile from "../app/api/redux/student/profile"
import projectWork from "../app/api/redux/student/projectWork"
import researchPaper from "../app/api/redux/student/researchPaper"
import sports from "../app/api/redux/student/sports"
import startups from "../app/api/redux/student/startups"
import technicalNonTechnical from "../app/api/redux/student/technicalNonTechnical"

// todo: after completing this , see here if this can be optimized or not.
// todo: learn redux , and it's coresponding terms

const store = configureStore({
  reducer: {
    app: appReducer,
    department: departmentReducer,
      consultancy: consultancyReducer,
      eventGrant: eventGrantReducer,
      mou: mouReducer,
      rndInitiatives: rndInitiativesReducers,

    faculty: facultyReducer,
      academicQualificationDiscipline: academicQualificationDiscipline,
      booksAndChapterAuthored: booksAndChapterAuthored,
      facultyAwarsAndRecognitions: facultyAwarsAndRecognitions,
      facultyDevlopmentProgram: facultyDevlopmentProgram,
      invitedTalks: invitedTalks,
      membershipInProffesionalBodies: membershipInProffesionalBodies,
      patentGranted: patentGranted,
      patentPublished: patentPublished,
      phdSupervision: phdSupervision,
      professionalCertificateEarned: professionalCertificateEarned,
      facultyProfile: facultyProfile,
      facultyresearchPaper: facultyresearchPaper,
      researchPaperGuided: researchPaperGuided,

    institute: instituteReducer,
      instituteConsultancy: instituteConsultancy,
      instituteEventGrant: instituteEventGrant,
      instituteEventOrganised: instituteEventOrganised,
      instituteDocuments: instituteDocuments,
      instituteMou: instituteMou,
      instituteRnd: instituteRnd,

    student: studentReducer,
      certificate: certificate,
      extraCurricular: extraCurricular,
      hackathon: hackathon,
      higherStudies: higherStudies,
      internship: internship,
      placement: placement,
      professionalMemberships: professionalMemberships,
      studentProfile: studentProfile,
      projectWork: projectWork,
      researchPaper: researchPaper,
      sports: sports,
      startups: startups,
      technicalNonTechnical: technicalNonTechnical,
  },
});


// types for hooks

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
