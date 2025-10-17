"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface ResearchPublicationFormData {
  id: string;
  facultyName: string;
  titleOfPaper: string;
  publicationDate: string;
  journalOrConferenceName: string;
  coAuthor: string;
  indexing: string;
  paperPdf: FileList;
  issnNumber: string;
  doiLink: string;
  authors: string;
  issnIsbn: string;
  department: string;
}

export default function ResearchPublicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResearchPublicationFormData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ResearchPublicationFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "paperPdf" && value instanceof FileList) {
          formData.append("paperPdf", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });
      
      const res = await fetch(`${BACKEND_URL}/faculty/research-paper`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Publication submitted successfully!");
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
        <Form.Label>Title of Paper</Form.Label>
        <Form.Control {...register("titleOfPaper", { required: true })} placeholder="Enter paper title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Publication Date</Form.Label>
        <Form.Control type="date" {...register("publicationDate", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Journal/Conference Name</Form.Label>
        <Form.Control {...register("journalOrConferenceName", { required: true })} placeholder="Enter journal or conference name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Co-Author(s)</Form.Label>
        <Form.Control {...register("coAuthor")} placeholder="Enter co-author names" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Indexing (SCI, Scopus, etc.)</Form.Label>
        <Form.Control {...register("indexing")} placeholder="Enter indexing status" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload Paper PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("paperPdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ISSN Number</Form.Label>
        <Form.Control {...register("issnNumber")} placeholder="Enter ISSN number" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>DOI Link</Form.Label>
        <Form.Control {...register("doiLink")} placeholder="Enter DOI link" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Authors</Form.Label>
        <Form.Control {...register("authors", { required: true })} placeholder="Enter list of authors" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ISSN/ISBN</Form.Label>
        <Form.Control {...register("issnIsbn")} placeholder="Enter ISSN or ISBN" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Control {...register("department", { required: true })} placeholder="Enter department name" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
