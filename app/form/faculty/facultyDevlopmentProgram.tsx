"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface FacultyDevelopmentProgramData {
  id: string;
  facultyName: string;
  department: string;
  fdpTitle: string;
  organizingInstitute: string;
  startDate: string;
  endDate: string;
  programType: string;
  mode: string;
  location: string;
  numberOfDays: number;
  certificatePdf: FileList;
  outcome: string;
}

export default function FacultyDevelopmentProgramForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyDevelopmentProgramData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyDevelopmentProgramData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "certificatePdf" && value instanceof FileList) {
          formData.append("certificatePdf", value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      const res = await fetch(`${BACKEND_URL}/faculty/devlopment-programme`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("FDP details submitted successfully!");
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
        <Form.Label>Department</Form.Label>
        <Form.Control {...register("department", { required: true })} placeholder="Enter department" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>FDP Title</Form.Label>
        <Form.Control {...register("fdpTitle", { required: true })} placeholder="Enter FDP title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Organizing Institute</Form.Label>
        <Form.Control {...register("organizingInstitute", { required: true })} placeholder="Enter organizing institute" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" {...register("startDate", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" {...register("endDate", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Program Type</Form.Label>
        <Form.Control {...register("programType", { required: true })} placeholder="Enter program type" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mode (Online, Offline, Hybrid)</Form.Label>
        <Form.Control {...register("mode", { required: true })} placeholder="Enter mode of program" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control {...register("location", { required: true })} placeholder="Enter location" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>No. of Days</Form.Label>
        <Form.Control type="number" {...register("numberOfDays", { required: true, min: 1 })} placeholder="Enter number of days" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Certificate PDF</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("certificatePdf", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Outcome / Learning Highlights</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("outcome")} placeholder="Enter outcome or learning highlights" />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
