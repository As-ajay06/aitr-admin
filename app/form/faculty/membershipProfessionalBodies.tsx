"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface FacultyMembershipData {
  facultyName: string;
  organizationName: string;
  membershipType: string;
  membershipId: string;
  dateOfJoining: string;
  currentStatus: string;
}

export default function FacultyMembershipForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyMembershipData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyMembershipData) => {
    setLoading(true);
    try {
      
      const res = await fetch(`${BACKEND_URL}/faculty/faculty-membership`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Membership details submitted successfully!");
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
        <Form.Label>Name of Organization (IEEE, ISTE, ACM, etc.)</Form.Label>
        <Form.Control {...register("organizationName", { required: true })} placeholder="Enter organization name" />
        {errors.organizationName && <small className="text-danger">Organization Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Membership Type (Life/Annual/Student/Professional)</Form.Label>
        <Form.Control {...register("membershipType", { required: true })} placeholder="Enter membership type" />
        {errors.membershipType && <small className="text-danger">Membership Type is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Membership ID</Form.Label>
        <Form.Control {...register("membershipId", { required: true })} placeholder="Enter membership ID" />
        {errors.membershipId && <small className="text-danger">Membership ID is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Joining</Form.Label>
        <Form.Control type="date" {...register("dateOfJoining", { required: true })} />
        {errors.dateOfJoining && <small className="text-danger">Date of Joining is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Current Status (Active/Expired)</Form.Label>
        <Form.Control {...register("currentStatus", { required: true })} placeholder="Enter current status" />
        {errors.currentStatus && <small className="text-danger">Current Status is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
