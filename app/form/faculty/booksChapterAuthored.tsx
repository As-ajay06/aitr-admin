"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface BookChapterDetailsData {
  title: string;
  publisher: string;
  isbn: string;
  yearOfPublication: number;
  coAuthors?: string;
}

export default function BookChapterDetailsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookChapterDetailsData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: BookChapterDetailsData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/book-chapter-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Book/Chapter details submitted successfully!");
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
        <Form.Label>Title of Book/Chapter</Form.Label>
        <Form.Control
          {...register("title", { required: true })}
          placeholder="Enter title of book or chapter"
        />
        {errors.title && <small className="text-danger">Title is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Publisher</Form.Label>
        <Form.Control
          {...register("publisher", { required: true })}
          placeholder="Enter publisher"
        />
        {errors.publisher && <small className="text-danger">Publisher is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          {...register("isbn", { required: true })}
          placeholder="Enter ISBN number"
        />
        {errors.isbn && <small className="text-danger">ISBN is required</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Year of Publication</Form.Label>
        <Form.Control
          type="number"
          {...register("yearOfPublication", { required: true, min: 1000, max: new Date().getFullYear() })}
          placeholder="Enter year of publication"
        />
        {errors.yearOfPublication && <small className="text-danger">Enter a valid year</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Co-authors (if any)</Form.Label>
        <Form.Control
          {...register("coAuthors")}
          placeholder="Enter co-authors, separated by commas"
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
