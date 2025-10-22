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

// Submitting all the files in one go 
import { ImportFiles } from "components/ImportFiles";

const StudentHeader = () => {

  const activeTab = useSelector((state: RootState) => state.student.tab);

  const [show, setShow] = useState(false);
  const [bulk  , setBulk ] = useState(false)


  const handleImport = () => setBulk(true);
  const handleImportClose = () => setBulk(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("active tab is ", activeTab);
  // todo : add cases for other forms also.
  const renderForm = () => {
    switch (activeTab) {
      case "extraCurricular":
        return <ExtraCurricular onClose={handleClose} />;
      case "highreStudies":
        return <HigherStudies onClose={handleClose} />;
      case "internship":
        return <Internship onClose={handleClose} />;
      case "placement":
        return <StudentPlacement onClose={handleClose} />;
      case "professionalMembership":
        return <ProfessionalMembership onClose={handleClose} />;
      case "projectWorkCapstoneProjects":
        return <ProjectWork onClose={handleClose} />;
      case "researchPaper":
        return <ResearchPaper onClose={handleClose} />;
      case "sports":
        return <Sports onClose={handleClose} />;
      case "startupsVentures":
        return <Startups onClose={handleClose} />;
      case "certification":
        return <StudentCertification onClose={handleClose} />;
      case "hackathonInnovationChallages":
        return <StudentHackathon onClose={handleClose} />;
      case "profile":
        return <StudentProfile onClose={handleClose} />;
      case "technicalNontechnicalCompetition":
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
              <h1 className="mb-3 h2">Student</h1>
              <DasherBreadcrumb />
            </div>
            <Flex
            className="gap-1"
            >
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
              <div>
                <Button
                  onClick={handleImport}
                  variant="dark"
                  className="d-md-flex align-items-center gap-2"
                >
                  <IconPlus size={18} />
                  Import data
                </Button>
              </div>
            </Flex>
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
      {/* Improting model */}
      <Modal show={bulk} onHide={handleImportClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Bulk data</Modal.Title>
        </Modal.Header>
        <Modal.Body><ImportFiles /></Modal.Body>
      </Modal>
    </>
  );
};

export default StudentHeader;
