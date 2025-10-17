"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface StudentProjectDetailsData {
  projectTitle: string;
  level: "UG" | "PG" | "PhD";
  studentNames: string;
  outcome: string;
}

export default function StudentProjectDetailsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProjectDetailsData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentProjectDetailsData) => {
    setLoading(true);
    try {
      
      const res = await fetch(`${BACKEND_URL}/faculty/research-paper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Project details submitted successfully!");
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

      <Form.Group className="mb-3">
        <Form.Label>Project Title</Form.Label>
        <Form.Control {...register("projectTitle", { required: true })} placeholder="Enter project title" />
        {errors.projectTitle && <small className="text-danger">Project Title is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Level</Form.Label>
        <Form.Select {...register("level", { required: true })} defaultValue="">
          <option value="" disabled>Select level</option>
          <option value="UG">UG</option>
          <option value="PG">PG</option>
          <option value="PhD">PhD</option>
        </Form.Select>
        {errors.level && <small className="text-danger">Level is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Student Names</Form.Label>
        <Form.Control {...register("studentNames", { required: true })} placeholder="Enter student names, separated by commas" />
        {errors.studentNames && <small className="text-danger">Student Names are required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Outcome</Form.Label>
        <Form.Control {...register("outcome", { required: true })} placeholder="Enter outcome (Publication, Patent, Prototype, etc.)" />
        {errors.outcome && <small className="text-danger">Outcome is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
