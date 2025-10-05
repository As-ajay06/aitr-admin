"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface FacultyTalkEngagementData {
  facultyName: string;
  titleOfTalk: string;
  eventName: string;
  organizingBody: string;
  date: string;
  natureOfEngagement: "Keynote" | "Panelist" | "Speaker";
  supportingDocument: FileList;
}

export default function FacultyTalkEngagementForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyTalkEngagementData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyTalkEngagementData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "supportingDocument" && value instanceof FileList) {
          formData.append("supportingDocument", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/faculty/talk-engagement", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Talk/session engagement submitted successfully!");
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
        {errors.facultyName && <small className="text-danger">Faculty Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title of Talk/Session</Form.Label>
        <Form.Control {...register("titleOfTalk", { required: true })} placeholder="Enter title of talk/session" />
        {errors.titleOfTalk && <small className="text-danger">Title is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event Name</Form.Label>
        <Form.Control {...register("eventName", { required: true })} placeholder="Enter event name" />
        {errors.eventName && <small className="text-danger">Event Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Organizing Body</Form.Label>
        <Form.Control {...register("organizingBody", { required: true })} placeholder="Enter organizing body" />
        {errors.organizingBody && <small className="text-danger">Organizing Body is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" {...register("date", { required: true })} />
        {errors.date && <small className="text-danger">Date is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nature of Engagement</Form.Label>
        <Form.Select {...register("natureOfEngagement", { required: true })} defaultValue="">
          <option value="" disabled>Select nature of engagement</option>
          <option value="Keynote">Keynote</option>
          <option value="Panelist">Panelist</option>
          <option value="Speaker">Speaker</option>
        </Form.Select>
        {errors.natureOfEngagement && <small className="text-danger">This field is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Supporting Letter or Certificate</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("supportingDocument", { required: true })} />
        {errors.supportingDocument && <small className="text-danger">This field is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
