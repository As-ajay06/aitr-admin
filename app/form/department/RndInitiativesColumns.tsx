"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface RndInitiativesData {
  departmentName: string;
  agencyName: string;
  date: string;
  duration: string;
  description: string;
  funding: string;
  pdf: FileList;
  projectTitle: string;
  fundingAgency: string;
  principalInvestigator: string;
  coInvestigator: string;
  budget: number;
  output: string;
}

export default function RndInitiatives() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RndInitiativesData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RndInitiativesData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "pdf" && value instanceof FileList) {
          formData.append("pdf", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/department/research-project", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Project submitted successfully!");
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
        <Form.Label>Department Name</Form.Label>
        <Form.Control {...register("departmentName", { required: true })} placeholder="Enter department name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Agency Name</Form.Label>
        <Form.Control {...register("agencyName", { required: true })} placeholder="Enter agency name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" {...register("date", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Duration</Form.Label>
        <Form.Control {...register("duration", { required: true })} placeholder="Enter duration" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("description", { required: true })} placeholder="Enter description" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Funding</Form.Label>
        <Form.Control {...register("funding", { required: true })} placeholder="Enter funding details" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("pdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Project Title</Form.Label>
        <Form.Control {...register("projectTitle", { required: true })} placeholder="Enter project title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Funding Agency</Form.Label>
        <Form.Control {...register("fundingAgency", { required: true })} placeholder="Enter funding agency" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Principal Investigator (PI)</Form.Label>
        <Form.Control {...register("principalInvestigator", { required: true })} placeholder="Enter PI name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Co-Investigator</Form.Label>
        <Form.Control {...register("coInvestigator")} placeholder="Enter co-investigator name (if any)" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Budget</Form.Label>
        <Form.Control type="number" {...register("budget", { required: true })} placeholder="Enter budget amount" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Output / Patents / Publications</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("output", { required: true })} placeholder="Enter output or publications" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
