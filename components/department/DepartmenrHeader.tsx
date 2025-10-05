"use client";
import { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { IconPlus } from "@tabler/icons-react";
import Flex from "components/common/Flex";
import DasherBreadcrumb from "components/common/DasherBreadcrumb";

import { useSelector } from "react-redux";
import { RootState } from "store/store";
// Import your forms
import MouForm from "app/form/deparment/MouForm";

const DepartmentHeader = () => {
  
  const activeTab = useSelector((state: RootState) => state.department.tab);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("active tab is " , activeTab);
  const renderForm = () => {
    switch (activeTab) {
      case "mou":
        return <MouForm onClose={handleClose} />;
      
      // todo : add cases for other forms also.
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
              <h1 className="mb-3 h2">Departments</h1>
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

export default DepartmentHeader;
