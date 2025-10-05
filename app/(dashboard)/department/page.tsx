"use client";


//import node module libraries
import { Fragment } from "react";

//import custom components
import MouTabDefination from "components/department/TabsDefination";
import DepartmentHeader from "components/department/DepartmenrHeader";

import { RecoilRoot } from "recoil"


const Department = () => {
  return (
    <RecoilRoot>
      <Fragment>
        <DepartmentHeader />
        <MouTabDefination />
      </Fragment>
    </RecoilRoot>
  );
};

export default Department;
