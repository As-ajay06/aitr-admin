"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface FacultyProfileData {
  id: string;
  name: string;
  email: string;
  qualification: string;
  department: string;
  mobileNumber: string;
  category: string;
  teachingExperience: number;
  industrialExperience: number;
  designation: string;
}

export default function FacultyProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyProfileData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyProfileData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/faculty/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Faculty profile submitted successfully!");
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
        <Form.Label>ID</Form.Label>
        <Form.Control {...register("id", { required: true })} placeholder="Enter ID" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control {...register("name", { required: true })} placeholder="Enter full name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" {...register("email", { required: true })} placeholder="Enter email address" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Qualification</Form.Label>
        <Form.Control {...register("qualification", { required: true })} placeholder="Enter qualification" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Control {...register("department", { required: true })} placeholder="Enter department" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="tel" {...register("mobileNumber", { required: true })} placeholder="Enter mobile number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control {...register("category", { required: true })} placeholder="Enter category (e.g., General/OBC/SC)" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Teaching Experience (Years)</Form.Label>
        <Form.Control type="number" {...register("teachingExperience", { required: true })} placeholder="Enter teaching experience" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Industrial Experience (Years)</Form.Label>
        <Form.Control type="number" {...register("industrialExperience", { required: true })} placeholder="Enter industrial experience" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Designation</Form.Label>
        <Form.Control {...register("designation", { required: true })} placeholder="Enter designation" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
