"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface FacultyEducationQualificationData {
  highestDegreeEarned: string;
  universityInstitute: string;
  specialization: string;
  yearOfCompletion: string;
  supportingDocument: FileList;
}

export default function FacultyEducationQualificationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacultyEducationQualificationData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FacultyEducationQualificationData) => {
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

      const res = await fetch("/api/faculty/education-qualification", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Education qualification submitted successfully!");
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
        <Form.Label>Highest Degree Earned</Form.Label>
        <Form.Control {...register("highestDegreeEarned", { required: true })} placeholder="Enter highest degree earned" />
        {errors.highestDegreeEarned && <small className="text-danger">This field is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>University/Institute</Form.Label>
        <Form.Control {...register("universityInstitute", { required: true })} placeholder="Enter university or institute name" />
        {errors.universityInstitute && <small className="text-danger">This field is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Specialization</Form.Label>
        <Form.Control {...register("specialization", { required: true })} placeholder="Enter specialization" />
        {errors.specialization && <small className="text-danger">This field is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Year of Completion</Form.Label>
        <Form.Control
          type="number"
          {...register("yearOfCompletion", { required: true, min: 1900, max: new Date().getFullYear() })}
          placeholder="Enter year of completion"
        />
        {errors.yearOfCompletion && <small className="text-danger">Enter a valid year</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Supporting Document (Certificate)</Form.Label>
        <Form.Control type="file" accept="application/pdf" {...register("supportingDocument", { required: true })} />
        {errors.supportingDocument && <small className="text-danger">This field is required</small>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
