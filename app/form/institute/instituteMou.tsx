"use client";

import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface InstituteMouProps {
  onClose: () => void;
}

interface InstituteMouValues {
  agencyName: string;
  date: string;
  duration: string;
  description: string;
  funding: string;
  mouPdf: string;
}

const InstituteMou = ({ onClose }: InstituteMouProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<InstituteMouValues>();

  const onSubmit = async (data: InstituteMouValues) => {
    try {
      console.log(data);
      const res = await fetch(`${BACKEND_URL}/institute/mou`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save data");

      alert("Agency MoU saved successfully ✅");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Agency Name</Form.Label>
        <Form.Control
          type="text"
          {...register("agencyName", { required: "Agency name is required" })}
          isInvalid={!!errors.agencyName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.agencyName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          {...register("date", { required: "Date is required" })}
          isInvalid={!!errors.date}
        />
        <Form.Control.Feedback type="invalid">
          {errors.date?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          {...register("duration", { required: "Duration is required" })}
          isInvalid={!!errors.duration}
        />
        <Form.Control.Feedback type="invalid">
          {errors.duration?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("description", { required: "Description is required" })}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Funding</Form.Label>
        <Form.Control
          type="text"
          {...register("funding", { required: "Funding is required" })}
          isInvalid={!!errors.funding}
        />
        <Form.Control.Feedback type="invalid">
          {errors.funding?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>MoU PDF (URL or file name)</Form.Label>
        <Form.Control
          type="text"
          {...register("mouPdf", { required: "PDF is required" })}
          isInvalid={!!errors.mouPdf}
        />
        <Form.Control.Feedback type="invalid">
          {errors.mouPdf?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="dark" className="mt-2">
        Save
      </Button>
    </Form>
  );
};

export default InstituteMou;
