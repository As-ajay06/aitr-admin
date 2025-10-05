"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

interface ExtraCurricular {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  eventName: string;
  eventDate: string;
  eventLevel: string;
  eventLocation: string;
  position: string;
  certificatePdf: FileList;
  organizer: string;
  coachName: string;
}

export default function ExtraCurricularForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExtraCurricular>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ExtraCurricular) => {
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

      const res = await fetch("/api/student/event-participation", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Event participation submitted successfully!");
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
            <Form.Label>Event Name</Form.Label>
            <Form.Control {...register("eventName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control type="date" {...register("eventDate", { required: true })} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Event Level</Form.Label>
            <Form.Control {...register("eventLevel", { required: true })} placeholder="e.g., Institute, State, National" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Location</Form.Label>
            <Form.Control {...register("eventLocation", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control {...register("position", { required: true })} placeholder="e.g., 1st, 2nd, Participation" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate PDF</Form.Label>
            <Form.Control type="file" accept="application/pdf" {...register("certificatePdf", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Organizer</Form.Label>
            <Form.Control {...register("organizer")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Coach Name</Form.Label>
            <Form.Control {...register("coachName")} />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
