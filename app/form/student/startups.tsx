"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface StartupInfo {
  startupName: string;
  domain: string;
  incubationSupport?: string;
  currentStatus: string;
  websiteOrLink?: string;
}

export default function StartupInfoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StartupInfo>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StartupInfo) => {
    setLoading(true);
    try {
      const res = await fetch("/api/startup/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Startup information submitted successfully!");
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
        <Form.Label>Startup Name</Form.Label>
        <Form.Control {...register("startupName", { required: true })} />
        {errors.startupName && <small className="text-danger">Required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Domain</Form.Label>
        <Form.Control {...register("domain", { required: true })} placeholder="e.g., EdTech, HealthTech, IoT" />
        {errors.domain && <small className="text-danger">Required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Incubation Support (if any)</Form.Label>
        <Form.Control {...register("incubationSupport")} placeholder="e.g., MSME Incubator, DST, etc." />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Current Status</Form.Label>
        <Form.Select {...register("currentStatus", { required: true })}>
          <option value="">Select status</option>
          <option value="Idea">Idea</option>
          <option value="Prototype">Prototype</option>
          <option value="Registered">Registered</option>
        </Form.Select>
        {errors.currentStatus && <small className="text-danger">Required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Website or Link (optional)</Form.Label>
        <Form.Control {...register("websiteOrLink")} placeholder="https://your-startup.com" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
