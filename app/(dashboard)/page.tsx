//import node module libraries
import { Fragment } from "react";
import { Metadata } from "next";
import { Col, Row } from "react-bootstrap";

//import custom components
import DashboardStats from "components/dashboard/DashboardStats";
import ActiveProject from "components/dashboard/ActiveProject";
import TeamsTable from "components/dashboard/TeamsTable";
import ProjectBudget from "components/dashboard/ProjectBudget";
import UpcomingMeetingSlider from "components/dashboard/UpcomingMeetingSlider";

export const metadata: Metadata = {
  title: "Project Dashboard | Dasher - Responsive Bootstrap 5 Admin Dashboard",
  description: "Dasher - Responsive Bootstrap 5 Admin Dashboard",
};

const HomePage = () => {
  return (
      <Fragment>
        <Row className="g-6 mb-6">
          <DashboardStats />
        </Row>
        <Row className="g-6 mb-6">
          <Col xl={8}>
            <ActiveProject />
            <TeamsTable />
          </Col>
          <Col xl={4}>
            <ProjectBudget />
            <UpcomingMeetingSlider />
          </Col>
        </Row>
      </Fragment>
  );
};

export default HomePage;
