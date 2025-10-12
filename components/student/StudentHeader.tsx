"use client";
import { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { IconPlus } from "@tabler/icons-react";
import Flex from "components/common/Flex";
import DasherBreadcrumb from "components/common/DasherBreadcrumb";

import { useSelector } from "react-redux";
import { RootState } from "store/store";
// Import your forms

import ExtraCurricular from "app/form/student/extraCurricular"
import HigherStudies from "app/form/student/higherStudies"
import Internship from "app/form/student/internship"
import StudentPlacement from "app/form/student/placement"
import ProfessionalMembership from "app/form/student/professionalMembership"
import ProjectWork from "app/form/student/projectWork"
import ResearchPaper from "app/form/student/researchPaper"
import Sports from "app/form/student/sports"
import Startups from "app/form/student/startups"
import StudentCertification from "app/form/student/studentCertification"
import StudentHackathon from "app/form/student/studentHackathon"
import StudentProfile from "app/form/student/studentProfile"
import TechnicaNonTechnical from "app/form/student/technicalNonTechnical"


const StudentHeader = () => {

  const activeTab = useSelector((state: RootState) => state.student.tab);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("active tab is ", activeTab);
  // todo : add cases for other forms also.
  const renderForm = () => {
    switch (activeTab) {
      case "extraCurricular":
        return <ExtraCurricular onClose={handleClose} />;
      case "higherStudies":
        return <HigherStudies onClose={handleClose} />;
      case "internship":
        return <Internship onClose={handleClose} />;
      case "plcament":
        return <StudentPlacement onClose={handleClose} />;
      case "professionalMembership":
        return <ProfessionalMembership onClose={handleClose} />;
      case "projectWork":
        return <ProjectWork onClose={handleClose} />;
      case "researchPaper":
        return <ResearchPaper onClose={handleClose} />;
      case "sports":
        return <Sports onClose={handleClose} />;
      case "startups":
        return <Startups onClose={handleClose} />;
      case "studentCertification":
        return <StudentCertification onClose={handleClose} />;
      case "studentHackathon":
        return <StudentHackathon onClose={handleClose} />;
      case "studentProfile":
        return <StudentProfile onClose={handleClose} />;
      case "technicalNonechnical":
        return <TechnicaNonTechnical onClose={handleClose} />;
      default:
        return <p>No form available for this tab.</p>;
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Flex
            justifyContent="between"
            alignItems="center"
            className="mb-8 w-100"
            breakpoint="md"
          >
            <div>
              <h1 className="mb-3 h2">Faculty</h1>
              <DasherBreadcrumb />
            </div>
            <div>
              <Button
                onClick={handleShow}
                variant="dark"
                className="d-md-flex align-items-center gap-2"
              >
                <IconPlus size={18} />
                Add new
              </Button>
            </div>
          </Flex>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
      </Modal>
    </>
  );
};

export default StudentHeader;
