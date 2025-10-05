"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

interface StudentCertificateData {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  courseName: string;
  issuingOrganization: string;
  issueDate: string;
  validityPeriod: string;
  gradeOrScore: string;
  certificateDescription: string;
  modeOfLearning: "Online" | "Offline" | "Hybrid";
  courseDuration: string;
  rankOrPosition: string;
  certificatePdf: FileList;
  relevanceToProgram: string;
}

export default function StudentCertificateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentCertificateData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentCertificateData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "certificatePdf" && value instanceof FileList) {
          formData.append("certificatePdf", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/student/certificates", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Certificate submitted successfully!");
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
            <Form.Control {...register("id", { required: true })} placeholder="Enter ID" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control {...register("studentName", { required: true })} placeholder="Enter student name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control {...register("enrollmentNumber", { required: true })} placeholder="Enter enrollment number" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Control {...register("branch", { required: true })} placeholder="Enter branch" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Batch</Form.Label>
            <Form.Control {...register("batch", { required: true })} placeholder="Enter batch" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control {...register("year", { required: true })} placeholder="Enter year" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course Name</Form.Label>
            <Form.Control {...register("courseName", { required: true })} placeholder="Enter course name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Issuing Organization</Form.Label>
            <Form.Control {...register("issuingOrganization", { required: true })} placeholder="Enter issuing organization" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Issue Date</Form.Label>
            <Form.Control type="date" {...register("issueDate", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Validity Period</Form.Label>
            <Form.Control {...register("validityPeriod", { required: true })} placeholder="e.g., 1 Year, Lifetime" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Grade or Score</Form.Label>
            <Form.Control {...register("gradeOrScore", { required: true })} placeholder="Enter grade or score" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate Description</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("certificateDescription", { required: true })} placeholder="Enter description" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mode of Learning</Form.Label>
            <Form.Select {...register("modeOfLearning", { required: true })}>
              <option value="">Select mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course Duration</Form.Label>
            <Form.Control {...register("courseDuration", { required: true })} placeholder="e.g., 6 Weeks, 3 Days" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rank / Position</Form.Label>
            <Form.Control {...register("rankOrPosition")} placeholder="Enter rank or position (if any)" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate PDF</Form.Label>
            <Form.Control type="file" accept="application/pdf" {...register("certificatePdf", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Relevance to Program / Branch</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("relevanceToProgram", { required: true })} placeholder="Explain relevance to course or branch" />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
