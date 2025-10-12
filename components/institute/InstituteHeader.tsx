"use client";
import { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { IconPlus } from "@tabler/icons-react";
import Flex from "components/common/Flex";
import DasherBreadcrumb from "components/common/DasherBreadcrumb";

import { useSelector } from "react-redux";
import { RootState } from "store/store";
// Import your forms

import InstituteEventOrganised from "app/form/institute/instituteEventOrganised"
import InstituteConsultancy from "app/form/institute/instituteConsultancy"
import InstituteDocuments from "app/form/institute/instituteDocuments"
import InstituteEventGrant from "app/form/institute/instituteEventGrant"
import InstituteMou from "app/form/institute/instituteMou"
import InstituteRnd from "app/form/institute/instituteRnd"

const InstituteHeader = () => {

  const activeTab = useSelector((state: RootState) => state.institute.tab);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("active tab is ", activeTab);
  // todo : add cases for other forms also.
  const renderForm = () => {
    switch (activeTab) {
      case "eventOrganised":
        return <InstituteEventOrganised onClose={handleClose} />;
      case "consultancy":
        return <InstituteConsultancy onClose={handleClose} />;
      case "instituteDocuments":
        return <InstituteDocuments onClose={handleClose} />;
      case "eventGrant":
        return <InstituteEventGrant onClose={handleClose} />;
      case "instituteMou":
        return <InstituteMou onClose={handleClose} />;
      case "rnd":
        return <InstituteRnd onClose={handleClose} />;
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

export default InstituteHeader;
