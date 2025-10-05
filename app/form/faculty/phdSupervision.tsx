"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface FacultyPhDSupervisionData {
  facultyName: string;
  phdScholarName: string;
  universityAffiliation: string;
  status: "Ongoing" | "Completed";
  researchTopic: string;
  dateOfRegistrationOrCompletion: string;
}

export default function FacultyPhDSupervisionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyPhDSupervisionData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyPhDSupervisionData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/faculty/phd-supervision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("PhD supervision details submitted successfully!");
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
        <Form.Label>Faculty Name</Form.Label>
        <Form.Control {...register("facultyName", { required: true })} placeholder="Enter faculty name" />
        {errors.facultyName && <small className="text-danger">Faculty Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>PhD Scholar Name</Form.Label>
        <Form.Control {...register("phdScholarName", { required: true })} placeholder="Enter PhD scholar name" />
        {errors.phdScholarName && <small className="text-danger">PhD Scholar Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>University Affiliation</Form.Label>
        <Form.Control {...register("universityAffiliation", { required: true })} placeholder="Enter university affiliation" />
        {errors.universityAffiliation && <small className="text-danger">University Affiliation is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select {...register("status", { required: true })} defaultValue="">
          <option value="" disabled>Select status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </Form.Select>
        {errors.status && <small className="text-danger">Status is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Research Topic</Form.Label>
        <Form.Control {...register("researchTopic", { required: true })} placeholder="Enter research topic" />
        {errors.researchTopic && <small className="text-danger">Research Topic is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Registration/Completion</Form.Label>
        <Form.Control type="date" {...register("dateOfRegistrationOrCompletion", { required: true })} />
        {errors.dateOfRegistrationOrCompletion && <small className="text-danger">Date is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
