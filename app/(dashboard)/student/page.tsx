//import node module libraries
import { Fragment } from "react";
import { Metadata } from "next";

//import custom components
import ProductListing from "components/ecommerce/ProductListing";
import EcommerceHeader from "components/ecommerce/EcommerceHeader";
import StudentHeader from "components/student/StudentHeader";
import StudentTabDefination from "components/student/TabsDefination";

export const metadata: Metadata = {
  title: "Products | Dasher - Responsive Bootstrap 5 Admin Dashboard",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

const Student = () => {
  return (
    <Fragment>
      <StudentHeader />
      <StudentTabDefination />
    </Fragment>
  );
};

export default Student;
