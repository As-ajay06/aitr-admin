"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface StudentResearchPaperData {
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  doiIsbn: string;
  titleOfPaper: string;
  publicationDate: string;
  journalOrConferenceName: string;
  coAuthor: string;
  indexing: string;
  paperPdf: FileList;
  facultyGuide: string;
}

export default function StudentResearchPaperForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentResearchPaperData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentResearchPaperData) => {
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

      const res = await fetch(`${BACKEND_URL}/studnet/research-paper`, {
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
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control {...register("studentName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control {...register("enrollmentNumber", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Control {...register("branch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Batch</Form.Label>
            <Form.Control {...register("batch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>DOI / ISBN</Form.Label>
            <Form.Control {...register("doiIsbn", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title of Paper</Form.Label>
            <Form.Control {...register("titleOfPaper", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Publication Date</Form.Label>
            <Form.Control type="date" {...register("publicationDate", { required: true })} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Journal / Conference Name</Form.Label>
            <Form.Control {...register("journalOrConferenceName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Co-Author</Form.Label>
            <Form.Control {...register("coAuthor")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Indexing (SCOPUS, SCI, etc.)</Form.Label>
            <Form.Control {...register("indexing")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Paper PDF</Form.Label>
            <Form.Control type="file" accept="application/pdf" {...register("paperPdf", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Faculty Guide</Form.Label>
            <Form.Control {...register("facultyGuide")} />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
