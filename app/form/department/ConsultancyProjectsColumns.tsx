"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface ConsultancyFormProps {
  onClose: () => void;
}

interface ConsultancyProjectFormData {
  departmentName: string;
  agencyName: string;
  date: string;
  duration: string;
  description: string;
  funding: string;
  pdf: FileList;
  titleOfConsultancy: string;
  clientIndustryPartner: string;
  facultyLead: string;
  amountSanctioned: string;
  supportingDocuments: FileList;
}

export default function ConsultancyProjectForm({ onClose }: ConsultancyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultancyProjectFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ConsultancyProjectFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if ((key === "pdf" || key === "supportingDocuments") && value instanceof FileList) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value as string);
        }
      });
      
      const res = await fetch(`${BACKEND_URL}/department/consultancy`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Consultancy project submitted successfully!");
      onClose();
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
        <Form.Label>Title of Consultancy</Form.Label>
        <Form.Control {...register("titleOfConsultancy", { required: true })} placeholder="Enter consultancy title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Client / Industry Partner</Form.Label>
        <Form.Control {...register("clientIndustryPartner", { required: true })} placeholder="Enter partner name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Faculty Lead</Form.Label>
        <Form.Control {...register("facultyLead", { required: true })} placeholder="Enter faculty lead" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount Sanctioned</Form.Label>
        <Form.Control type="number" {...register("amountSanctioned", { required: true })} placeholder="Enter amount" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Supporting Documents</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("supportingDocuments", { required: true })} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
