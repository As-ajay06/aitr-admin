"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface StudentTechinalNonTechnicalData {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  competitionName: string;
  date: string;
  teamName: string;
  teamSize: number;
  mentorName: string;
  level: string;
  organizer: string;
  venue: string;
  problemStatement: string;
  technologyUsed: string;
  prizeMoney: string;
  sponsoringAgency: string;
  positionSecured: string;
  projectGithubLink: string;
  projectDescription: string;
  certificatePdf: FileList;
  eventMode: string;
  achievement: string;
}

export default function StudentTechinalNonTechnicalForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentTechinalNonTechnicalData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StudentTechinalNonTechnicalData) => {
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

      const res = await fetch(`${BACKEND_URL}/studnet/technicalNontechnical`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Competition achievement submitted successfully!");
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
            <Form.Label>Student Name</Form.Label>
            <Form.Control {...register("studentName", { required: true })} placeholder="Enter student name" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control {...register("enrollmentNumber", { required: true })} placeholder="Enter enrollment number" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Control {...register("branch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Batch</Form.Label>
            <Form.Control {...register("batch", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control {...register("year", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Competition Name</Form.Label>
            <Form.Control {...register("competitionName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" {...register("date", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Name</Form.Label>
            <Form.Control {...register("teamName", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Size</Form.Label>
            <Form.Control type="number" {...register("teamSize", { required: true, min: 1 })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mentor Name</Form.Label>
            <Form.Control {...register("mentorName")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Level</Form.Label>
            <Form.Select {...register("level", { required: true })}>
              <option value="">Select</option>
              <option value="Institute">Institute</option>
              <option value="State">State</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Organizer</Form.Label>
            <Form.Control {...register("organizer")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Control {...register("venue")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Problem Statement</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("problemStatement")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technology Used</Form.Label>
            <Form.Control {...register("technologyUsed")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prize Money</Form.Label>
            <Form.Control {...register("prizeMoney")} placeholder="e.g., ₹10,000 or NA" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sponsoring Agency</Form.Label>
            <Form.Control {...register("sponsoringAgency")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position Secured</Form.Label>
            <Form.Control {...register("positionSecured")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project GitHub Link</Form.Label>
            <Form.Control type="url" {...register("projectGithubLink")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Description</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("projectDescription")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificate PDF</Form.Label>
            <Form.Control type="file" accept="application/pdf" {...register("certificatePdf", { required: true })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Mode</Form.Label>
            <Form.Select {...register("eventMode", { required: true })}>
              <option value="">Select</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Achievement</Form.Label>
            <Form.Select {...register("achievement", { required: true })}>
              <option value="">Select</option>
              <option value="Participation">Participation</option>
              <option value="Winner">Winner</option>
              <option value="Rank">Rank</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
