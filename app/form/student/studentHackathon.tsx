"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { BACKEND_URL } from "config";

interface HackathonData {
  hackathonName: string;
  organizer: string;
  teamDetails: string;
  result: string;
  eventDate: string;
  teamName: string;
  teamSize: number;
  mentorName: string;
  venue: string;
  problemStatement: string;
  technologyUsed: string;
  priceMoney?: number;
  positionSecured: string;
}

export default function HackathonForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HackathonData>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: HackathonData) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/studnet/hackathon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");
      alert("Hackathon data submitted successfully!");
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
            <Form.Label>Hackathon Name</Form.Label>
            <Form.Control {...register("hackathonName", { required: true })} />
            {errors.hackathonName && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Organizer</Form.Label>
            <Form.Control {...register("organizer", { required: true })} />
            {errors.organizer && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Details</Form.Label>
            <Form.Control {...register("teamDetails", { required: true })} placeholder="List team members" />
            {errors.teamDetails && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Result</Form.Label>
            <Form.Select {...register("result", { required: true })}>
              <option value="">Select result</option>
              <option value="Selected">Selected</option>
              <option value="Winner">Winner</option>
              <option value="Finalist">Finalist</option>
            </Form.Select>
            {errors.result && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Date</Form.Label>
            <Form.Control type="date" {...register("eventDate", { required: true })} />
            {errors.eventDate && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Team Name</Form.Label>
            <Form.Control {...register("teamName", { required: true })} />
            {errors.teamName && <small className="text-danger">Required</small>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Team Size</Form.Label>
            <Form.Control
              type="number"
              {...register("teamSize", { required: true, min: 1 })}
              placeholder="Enter number of members"
            />
            {errors.teamSize && <small className="text-danger">Required and must be at least 1</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mentor Name</Form.Label>
            <Form.Control {...register("mentorName", { required: true })} />
            {errors.mentorName && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Control {...register("venue", { required: true })} />
            {errors.venue && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Problem Statement</Form.Label>
            <Form.Control as="textarea" rows={3} {...register("problemStatement", { required: true })} />
            {errors.problemStatement && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Technology Used</Form.Label>
            <Form.Control {...register("technologyUsed", { required: true })} />
            {errors.technologyUsed && <small className="text-danger">Required</small>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price Money (optional)</Form.Label>
            <Form.Control type="number" {...register("priceMoney")} placeholder="Enter amount" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position Secured</Form.Label>
            <Form.Control {...register("positionSecured", { required: true })} />
            {errors.positionSecured && <small className="text-danger">Required</small>}
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Form>
  );
}
