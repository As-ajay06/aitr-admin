"use client";
import { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { IconPlus } from "@tabler/icons-react";
import Flex from "components/common/Flex";
import DasherBreadcrumb from "components/common/DasherBreadcrumb";

import { useSelector } from "react-redux";
import { RootState } from "store/store";
// Import your forms

import AcademicQulificationDiscipline from "app/form/faculty/academinQualification"
import BooksChapterAuthored from "app/form/faculty/booksChapterAuthored"
import FacultyAwarsRecognition from "app/form/faculty/facultyAwardsRecognition"
import FacultyDevlopmentProgram from "app/form/faculty/facultyDevlopmentProgram"
import FacultyPatentGranted from "app/form/faculty/facultyPatentGranted"
import FacultyPatentPublished from "app/form/faculty/facultyPatentPublished"
import FacultyProfile from "app/form/faculty/facultyProfile"
import FacultyReasearchProjectsGuided from "app/form/faculty/facultyReasearchProjectsGuided"
import FacultyInvitedTalks from "app/form/faculty/invitedTalks"
import MembershipProffesionalBodies from "app/form/faculty/membershipProfessionalBodies"
import PhdSupervision from "app/form/faculty/phdSupervision"
import ProfessinalCertificateEarned from "app/form/faculty/professionalCertificateEarned"
import ResearchPaperPublication from "app/form/faculty/researchPaperPublication"


const FacultyHeader = () => {

  const activeTab = useSelector((state: RootState) => state.faculty.tab);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("active tab is ", activeTab);
  
  const renderForm = () => {
    switch (activeTab) {
      case "academicQualification":
        return <AcademicQulificationDiscipline onClose={handleClose} />;
      case "booksChapterAuthored":
        return <BooksChapterAuthored onClose={handleClose} />;
      case "facultyAwardAndPublication":
        return <FacultyAwarsRecognition onClose={handleClose} />;
      case "facultyDevlopmentPrograms":
        return <FacultyDevlopmentProgram onClose={handleClose} />;
      case "patentGranted":
        return <FacultyPatentGranted onClose={handleClose} />;
      case "patentPublished":
        return <FacultyPatentPublished onClose={handleClose} />;
      case "profile":
        return <FacultyProfile onClose={handleClose} />;
      case "researchProjectGuided":
        return <FacultyReasearchProjectsGuided onClose={handleClose} />;
      case "invitedTalks":
        return <FacultyInvitedTalks onClose={handleClose} />;
      case "membershipProfessionalBodies":
        return <MembershipProffesionalBodies onClose={handleClose} />;
      case "phdSupervision":
        return <PhdSupervision onClose={handleClose} />;
      case "professionalCertificationEarned":
        return <ProfessinalCertificateEarned onClose={handleClose} />;
      case "reseachPaperPublications":
        return <ResearchPaperPublication onClose={handleClose} />;
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
          <Modal.Title>Add New {activeTab}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderForm()}</Modal.Body>
      </Modal>
    </>
  );
};

export default FacultyHeader;
