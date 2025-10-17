"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

interface HigherStudiesData {
  courseName: string;
  scholarship?: string;
  instituteName: string;
  city: string;
  country: string;
  duration: string;
  admissionYear: number;
}

export default function HigherStudiesForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HigherStudiesData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: HigherStudiesData) => {
    setLoading(true);
    try {
      const res = await fetch(`{BACKEND_URL}/student/higher-study`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Course and Scholarship info submitted!");
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
            <Form.Label>Name of the Course</Form.Label>
            <Form.Control {...register("courseName", { required: true })} />
            {errors.courseName && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Scholarship (if any)</Form.Label>
            <Form.Control {...register("scholarship")} placeholder="Enter scholarship details" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name of the Institute</Form.Label>
            <Form.Control {...register("instituteName", { required: true })} />
            {errors.instituteName && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control {...register("city", { required: true })} />
            {errors.city && <small className="text-danger">Required</small>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control {...register("country", { required: true })} />
            {errors.country && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration of Program</Form.Label>
            <Form.Control {...register("duration", { required: true })} placeholder="e.g., 2 years, 6 months" />
            {errors.duration && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Admission Year</Form.Label>
            <Form.Control
              type="number"
              {...register("admissionYear", {
                required: true,
                min: 1900,
                max: new Date().getFullYear(),
              })}
              placeholder="e.g., 2023"
            />
            {errors.admissionYear && <small className="text-danger">Valid year required</small>}
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
