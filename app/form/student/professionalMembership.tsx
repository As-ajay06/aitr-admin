"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface ProfessionalMembershipData {
  organizationName: string;
  membershipId: string;
  dateOfJoining: string;
  membershipStatus: string;
}

export default function ProfessionalMembershipForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfessionalMembershipData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ProfessionalMembershipData) => {
    setLoading(true);
    try {
      // todo : complete this endpoint
      const res = await fetch(`{BACKEND_URL}/student/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Professional membership submitted!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "500px" }}>
      <Form.Group className="mb-3">
        <Form.Label>Organization Name</Form.Label>
        <Form.Control {...register("organizationName", { required: true })} placeholder="IEI, CSI, IEEE, etc." />
        {errors.organizationName && <small className="text-danger">Organization Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Membership ID</Form.Label>
        <Form.Control {...register("membershipId", { required: true })} />
        {errors.membershipId && <small className="text-danger">Membership ID is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Joining</Form.Label>
        <Form.Control type="date" {...register("dateOfJoining", { required: true })} />
        {errors.dateOfJoining && <small className="text-danger">Date of Joining is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Membership Status</Form.Label>
        <Form.Control {...register("membershipStatus", { required: true })} placeholder="Active, Expired, etc." />
        {errors.membershipStatus && <small className="text-danger">Membership Status is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
