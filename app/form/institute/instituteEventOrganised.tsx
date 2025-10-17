"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface InstituteEventOrganisedData {
  eventName: string;
  typeOfEvent: string;
  agencyName: string;
  category: string;
  numberOfParticipants: number;
  date: string;
  duration: string;
  description: string;
  funding: string;
  pdf: FileList;
}

interface InstituteEventOrganisedProp{
  onClose: () => void;
}


export default function InstituetEventOrganised({ onClose }: InstituteEventOrganisedProp) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InstituteEventOrganisedData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InstituteEventOrganisedData) => {
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
      const res = await fetch(`${BACKEND_URL}/faculty/event-organised`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Form submitted successfully!");
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
        <Form.Label>Event Name</Form.Label>
        <Form.Control {...register("eventName", { required: true })} placeholder="Enter event name" />
        {errors.eventName && <small className="text-danger">Event Name is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type of Event</Form.Label>
        <Form.Control {...register("typeOfEvent", { required: true })} placeholder="Enter type of event" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Agency Name</Form.Label>
        <Form.Control {...register("agencyName", { required: true })} placeholder="Enter agency name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control {...register("category", { required: true })} placeholder="Enter category" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Number of Participants</Form.Label>
        <Form.Control
          type="number"
          {...register("numberOfParticipants", { required: true, min: 1 })}
          placeholder="Enter number of participants"
        />
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
        <Form.Control {...register("funding", { required: true })} placeholder="Enter funding source" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>PDF Upload</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("pdf", { required: true })} />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
