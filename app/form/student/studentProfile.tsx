"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface StudentProfileData {
  id: string;
  name: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  email: string;
  year: string;
  course: string;
  cgpa: number;
  dateOfBirth: string;
  gender: string;
  category: string;
  yearOfAdmission: number;
  yearOfGraduation: number;
  status: string;
  githubLink: string;
  linkedinLink: string;
  parentContactNumber: string;
  parentName: string;
  address: string;
}

export default function StudentProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentProfileData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentProfileData) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/studnet/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Student profile submitted successfully!");
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
            <Form.Label>ID</Form.Label>
            <Form.Control {...register("id", { required: true })} placeholder="Enter ID" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control {...register("name", { required: true })} placeholder="Enter name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control {...register("enrollmentNumber", { required: true })} placeholder="Enter enrollment number" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Control {...register("branch", { required: true })} placeholder="Enter branch" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Batch</Form.Label>
            <Form.Control {...register("batch", { required: true })} placeholder="Enter batch (e.g., 2021-2025)" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register("email", { required: true })} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control {...register("year", { required: true })} placeholder="Enter year (e.g., 2nd Year)" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control {...register("course", { required: true })} placeholder="Enter course" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CGPA</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              {...register("cgpa", { required: true, min: 0, max: 10 })}
              placeholder="Enter CGPA"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" {...register("dateOfBirth", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select {...register("gender", { required: true })}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control {...register("category", { required: true })} placeholder="Enter category" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year of Admission</Form.Label>
            <Form.Control type="number" {...register("yearOfAdmission", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year of Graduation</Form.Label>
            <Form.Control type="number" {...register("yearOfGraduation", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select {...register("status", { required: true })}>
              <option value="">Select status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Graduated">Graduated</option>
              <option value="Dropped">Dropped</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GitHub Link</Form.Label>
            <Form.Control type="url" {...register("githubLink")} placeholder="Enter GitHub profile link" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>LinkedIn Profile Link</Form.Label>
            <Form.Control type="url" {...register("linkedinLink")} placeholder="Enter LinkedIn profile link" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Parent/Guardian Name</Form.Label>
            <Form.Control {...register("parentName", { required: true })} placeholder="Enter parent/guardian name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Parent/Guardian Contact Number</Form.Label>
            <Form.Control
              {...register("parentContactNumber", { required: true })}
              placeholder="Enter contact number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("address", { required: true })}
              placeholder="Enter full address"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
