"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface PatentPublishedData {
  id: string;
  facultyName: string;
  department: string;
  title: string;
  applicant: string;
  applicationNumber: string;
  applicationDate: string;
  status: string;
  coInventors: string;
  country: string;
  category: string;
  certificatePdf: FileList;
  patentTitle: string;
  inventors: string;
  publicationDate: string;
  abstract: string;
}

export default function PatentPublishedForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatentPublishedData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: PatentPublishedData) => {
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
      
      const res = await fetch(`${BACKEND_URL}/faculty/patent-published`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Patent submitted successfully!");
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
        <Form.Label>Faculty Name</Form.Label>
        <Form.Control {...register("facultyName", { required: true })} placeholder="Enter faculty name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Control {...register("department", { required: true })} placeholder="Enter department" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control {...register("title", { required: true })} placeholder="Enter title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Applicant</Form.Label>
        <Form.Control {...register("applicant", { required: true })} placeholder="Enter applicant name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Application Number</Form.Label>
        <Form.Control {...register("applicationNumber", { required: true })} placeholder="Enter application number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Application Date</Form.Label>
        <Form.Control type="date" {...register("applicationDate", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status (Published / Under Review)</Form.Label>
        <Form.Control {...register("status", { required: true })} placeholder="Enter status" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Co-Inventors</Form.Label>
        <Form.Control {...register("coInventors")} placeholder="Enter co-inventors" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control {...register("country", { required: true })} placeholder="Enter country" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control {...register("category", { required: true })} placeholder="Enter category" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certificate PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("certificatePdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Patent Title</Form.Label>
        <Form.Control {...register("patentTitle", { required: true })} placeholder="Enter patent title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Inventors</Form.Label>
        <Form.Control {...register("inventors", { required: true })} placeholder="Enter inventors" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Publication Date</Form.Label>
        <Form.Control type="date" {...register("publicationDate", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Abstract</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("abstract")} placeholder="Enter abstract" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
