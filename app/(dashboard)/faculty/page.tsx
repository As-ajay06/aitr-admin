"use client";

//import node module libraries
import { Fragment } from "react";
import { RecoilRoot } from "recoil";
//import custom components


import FacultyHeader from "components/faculty/FacultyHeader";
import FacultyTabDefination from "components/faculty/TabsDefination";



const Faculty = () => {
  return (
    <RecoilRoot>
      <Fragment>
        <FacultyHeader />
        <FacultyTabDefination />
      </Fragment>
    </RecoilRoot>
  );
};

export default Faculty;
