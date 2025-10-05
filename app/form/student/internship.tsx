"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

interface StudentInternshipData {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  companyName: string;
  internshipRole: string;
  modeOfInternship: "Online" | "Offline" | "Hybrid";
  stipend: string;
  startDate: string;
  endDate: string;
  certificateOrReport: FileList;
  technologyUsed: string;
  projectName: string;
  projectDescription: string;
  companyLocation: string;
  areaOfWork: string;
}

export default function StudentInternshipForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentInternshipData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentInternshipData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "certificateOrReport" && value instanceof FileList) {
          formData.append("certificateOrReport", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/student/internship", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Internship details submitted successfully!");
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
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control {...register("enrollmentNumber", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Control {...register("branch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Batch</Form.Label>
            <Form.Control {...register("batch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control {...register("year", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control {...register("companyName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Internship Role</Form.Label>
            <Form.Control {...register("internshipRole", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mode of Internship</Form.Label>
            <Form.Select {...register("modeOfInternship", { required: true })}>
              <option value="">Select</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stipend</Form.Label>
            <Form.Control {...register("stipend")} placeholder="e.g., ₹10,000/month or NA" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" {...register("startDate", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" {...register("endDate", { required: true })} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Certificate / Report Upload</Form.Label>
            <Form.Control type="file" accept="application/pdf" {...register("certificateOrReport", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technology Used</Form.Label>
            <Form.Control {...register("technologyUsed")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control {...register("projectName")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Description</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("projectDescription")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company Location</Form.Label>
            <Form.Control {...register("companyLocation")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Area of Work</Form.Label>
            <Form.Control {...register("areaOfWork")} placeholder="e.g., Web Development, Data Science" />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
