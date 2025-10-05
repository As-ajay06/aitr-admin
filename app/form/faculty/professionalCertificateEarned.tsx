"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface FacultyCertificationData {
  facultyName: string;
  certificationName: string;
  issuingBody: string;
  certificationLevel: string;
  validityPeriod: string;
  fieldDomain: string;
  certificateUpload: FileList;
}

export default function FacultyCertificationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyCertificationData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyCertificationData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "certificateUpload" && value instanceof FileList) {
          formData.append("certificateUpload", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/faculty/certification", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Certification details submitted successfully!");
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
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certification Name</Form.Label>
        <Form.Control {...register("certificationName", { required: true })} placeholder="Enter certification name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Issuing Body</Form.Label>
        <Form.Control {...register("issuingBody", { required: true })} placeholder="Enter issuing body" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certification Level (Beginner/Advanced/etc.)</Form.Label>
        <Form.Control {...register("certificationLevel", { required: true })} placeholder="Enter certification level" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Validity Period</Form.Label>
        <Form.Control {...register("validityPeriod", { required: true })} placeholder="Enter validity period" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Field/Domain</Form.Label>
        <Form.Control {...register("fieldDomain", { required: true })} placeholder="Enter field or domain" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certificate Upload</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("certificateUpload", { required: true })} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
