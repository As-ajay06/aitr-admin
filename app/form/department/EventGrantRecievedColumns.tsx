"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface EventGrantRecieved {
  onClose: () => void;
}

interface EventGrantRecievedData {
  typeOfEvent: string;
  departmentName: string;
  grantingAgency: string;
  category: string;
  numberOfParticipants: number;
  dateOfApproval: string;
  duration: string;
  description: string;
  funding: string;
  pdf: FileList;
  eventTitle: string;
  grantAmount: number;
  facultyCoordinator: string;
  purpose: string;
  utilizationSummary: string;
}

export default function EventGrantRecieved({ onClose }: EventGrantRecieved) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventGrantRecievedData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: EventGrantRecievedData) => {
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
    
      const res = await fetch(`${BACKEND_URL}/department/event-grrant-received`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Form submitted successfully!");
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
        <Form.Label>Type of Event</Form.Label>
        <Form.Control {...register("typeOfEvent", { required: true })} placeholder="Enter event type" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department Name</Form.Label>
        <Form.Control {...register("departmentName", { required: true })} placeholder="Enter department name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Granting Agency</Form.Label>
        <Form.Control {...register("grantingAgency", { required: true })} placeholder="Enter granting agency" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control {...register("category", { required: true })} placeholder="Enter category" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of Participants</Form.Label>
        <Form.Control type="number" {...register("numberOfParticipants", { required: true, min: 1 })} placeholder="Enter number of participants" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Approval</Form.Label>
        <Form.Control type="date" {...register("dateOfApproval", { required: true })} />
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
        <Form.Control {...register("funding", { required: true })} placeholder="Enter funding source" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("pdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Event Title</Form.Label>
        <Form.Control {...register("eventTitle", { required: true })} placeholder="Enter event title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Grant Amount</Form.Label>
        <Form.Control type="number" {...register("grantAmount", { required: true })} placeholder="Enter grant amount" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Faculty Coordinator</Form.Label>
        <Form.Control {...register("facultyCoordinator", { required: true })} placeholder="Enter faculty coordinator name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Purpose</Form.Label>
        <Form.Control as="textarea" rows={2} {...register("purpose", { required: true })} placeholder="Enter purpose" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Utilization Summary</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("utilizationSummary", { required: true })} placeholder="Enter utilization summary" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
