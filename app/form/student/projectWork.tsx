"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface StudentProjectData {
  projectTitle: string;
  teamMembers: string;
  guideName: string;
  semester: string;
  industryMentor?: string;
  projectOutcome: string;
}

export default function StudentProjectForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProjectData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentProjectData) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/student/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Project submitted successfully!");
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
            <Form.Label>Project Title</Form.Label>
            <Form.Control {...register("projectTitle", { required: true })} />
            {errors.projectTitle && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Members</Form.Label>
            <Form.Control
              {...register("teamMembers", { required: true })}
              placeholder="Comma-separated names (e.g., Alice, Bob, Charlie)"
            />
            {errors.teamMembers && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Guide Name</Form.Label>
            <Form.Control {...register("guideName", { required: true })} />
            {errors.guideName && <small className="text-danger">Required</small>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Semester</Form.Label>
            <Form.Control {...register("semester", { required: true })} placeholder="e.g., 6th, 8th" />
            {errors.semester && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Industry Mentor (Optional)</Form.Label>
            <Form.Control {...register("industryMentor")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Outcome</Form.Label>
            <Form.Control
              {...register("projectOutcome", { required: true })}
              placeholder="e.g., Prototype, Patent, Research Paper"
            />
            {errors.projectOutcome && <small className="text-danger">Required</small>}
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
