"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface PatentGrantDetailsData {
  patentTitle: string;
  inventors: string;
  grantNumber: string;
  dateOfGrant: string;
  countryOfGrant: string;
  applicationNumber: string;
  patentCertificateUpload: FileList;
}

export default function PatentGrantDetailsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatentGrantDetailsData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: PatentGrantDetailsData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "patentCertificateUpload" && value instanceof FileList) {
          formData.append("patentCertificateUpload", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/patent/grant-details", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Patent grant details submitted successfully!");
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
        <Form.Label>Patent Title</Form.Label>
        <Form.Control {...register("patentTitle", { required: true })} placeholder="Enter patent title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Inventors</Form.Label>
        <Form.Control {...register("inventors", { required: true })} placeholder="Enter inventors" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Grant Number</Form.Label>
        <Form.Control {...register("grantNumber", { required: true })} placeholder="Enter grant number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Grant</Form.Label>
        <Form.Control type="date" {...register("dateOfGrant", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country of Grant</Form.Label>
        <Form.Control {...register("countryOfGrant", { required: true })} placeholder="Enter country of grant" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Application Number</Form.Label>
        <Form.Control {...register("applicationNumber", { required: true })} placeholder="Enter application number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Patent Certificate Upload</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("patentCertificateUpload", { required: true })} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
