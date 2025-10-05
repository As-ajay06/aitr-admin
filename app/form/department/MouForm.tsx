"use client";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

interface MouFormProps {
  onClose: () => void;
}

interface MouFormValues {
  title: string;
  organization: string;
  signedDate: string;
}

const MouForm = ({ onClose }: MouFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<MouFormValues>();

  const onSubmit = async (data: MouFormValues) => {
    try {
        console.log(data);
      const res = await fetch("/api/mou", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save data");

      alert("MoU saved successfully ✅");
      onClose(); // close modal
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          {...register("title", { required: "Title is required" })}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Organization</Form.Label>
        <Form.Control
          type="text"
          {...register("organization", { required: "Organization is required" })}
          isInvalid={!!errors.organization}
        />
        <Form.Control.Feedback type="invalid">
          {errors.organization?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Signed Date</Form.Label>
        <Form.Control
          type="date"
          {...register("signedDate", { required: "Date is required" })}
          isInvalid={!!errors.signedDate}
        />
        <Form.Control.Feedback type="invalid">
          {errors.signedDate?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="dark" className="mt-2">
        Save
      </Button>
    </Form>
  );
};

export default MouForm;
