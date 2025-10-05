"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface AwardSubmissionFormData {
  id: string;
  recipientName: string;
  department: string;
  awardName: string;
  issuingOrganization: string;
  date: string;
  category: string;
  eventName: string;
  description: string;
  certificatePdf: FileList;
  titleOfAward: string;
  level: string;
  supportingDocument: FileList;
}

export default function AwardSubmissionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AwardSubmissionFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AwardSubmissionFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (
          (key === "certificatePdf" || key === "supportingDocument") &&
          value instanceof FileList
        ) {
          if (value.length > 0) {
            formData.append(key, value[0]);
          }
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/awards/submit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Award submitted successfully!");
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
        <Form.Label>Recipient Name</Form.Label>
        <Form.Control {...register("recipientName", { required: true })} placeholder="Enter recipient name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Control {...register("department", { required: true })} placeholder="Enter department" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Award Name</Form.Label>
        <Form.Control {...register("awardName", { required: true })} placeholder="Enter award name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Issuing Organization</Form.Label>
        <Form.Control {...register("issuingOrganization", { required: true })} placeholder="Enter issuing organization" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" {...register("date", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control {...register("category", { required: true })} placeholder="Enter category" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event Name</Form.Label>
        <Form.Control {...register("eventName")} placeholder="Enter event name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description / Purpose</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("description")} placeholder="Enter description or purpose" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certificate PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("certificatePdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title of Award</Form.Label>
        <Form.Control {...register("titleOfAward", { required: true })} placeholder="Enter title of award" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Level (Institute, State, National, International)</Form.Label>
        <Form.Control {...register("level", { required: true })} placeholder="Enter award level" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Supporting Document</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("supportingDocument")} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
