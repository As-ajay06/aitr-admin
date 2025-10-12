"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface InstituteDocument {
  aicteAffiliationPdf: FileList;
  rgpvPdf: FileList;
  societyPdf: FileList;
  bylawsPdf: FileList;
}

interface InstituteDocumentProps{
  onClose: () => void;
}

export default function InstituteDocumentForm({ onClose }: InstituteDocumentProps ) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InstituteDocument>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InstituteDocument) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("aicteAffiliationPdf", data.aicteAffiliationPdf[0]);
      formData.append("rgpvPdf", data.rgpvPdf[0]);
      formData.append("societyPdf", data.societyPdf[0]);
      formData.append("bylawsPdf", data.bylawsPdf[0]);

      const res = await fetch("/api/department/documents", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload documents");
      alert("Documents uploaded successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
      <Form.Group className="mb-3">
        <Form.Label>AICTE Affiliation PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("aicteAffiliationPdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>RGPV PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("rgpvPdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Society PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("societyPdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>By Laws PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("bylawsPdf", { required: true })} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </Form>
  );
}
