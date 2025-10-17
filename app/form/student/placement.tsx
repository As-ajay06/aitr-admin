"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

interface StudentPlacementData {
  id: string;
  studentName: string;
  companyName: string;
  companyLocation: string;
  roleOffered: string;
  branch: string;
  batch: string;
  year: string;
  placementType: "On Campus" | "Off Campus";
  package: string;
  joiningDate: string;
  offerLetterPdf: FileList;
}

export default function StudentPlacementForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentPlacementData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentPlacementData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "offerLetterPdf" && value instanceof FileList) {
          formData.append("offerLetterPdf", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch(`{BACKEND_URL}/student/placement`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Placement details submitted successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control {...register("id", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control {...register("studentName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control {...register("companyName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Location</Form.Label>
            <Form.Control {...register("companyLocation", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role Offered</Form.Label>
            <Form.Control {...register("roleOffered", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Control {...register("branch", { required: true })} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Batch</Form.Label>
            <Form.Control {...register("batch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control {...register("year", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Placement Type</Form.Label>
            <Form.Select {...register("placementType", { required: true })}>
              <option value="">Select</option>
              <option value="On Campus">On Campus</option>
              <option value="Off Campus">Off Campus</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Package</Form.Label>
            <Form.Control {...register("package", { required: true })} placeholder="e.g., 6 LPA" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Joining Date</Form.Label>
            <Form.Control type="date" {...register("joiningDate", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Offer Letter PDF</Form.Label>
            <Form.Control type="file" accept="application/pdf" {...register("offerLetterPdf", { required: true })} />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
