"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentCompetitionType {
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
  level: "Institute" | "State" | "National" | "International";
  organizer: string;
  venue: string;
  problemStatement: string;
  technologyUsed: string;
  priceMoney: string;
  sponsoringAgency: string;
  positionSecured: string;
  projectGithubLink?: string;
  projectDescription: string;
  certificatePdf?: string;
  eventMode: "Online" | "Offline" | "Hybrid";
  achievement: string; // e.g., Participation, Winner, Rank
}

export const StudentCompetitionColumns: ColumnDef<StudentCompetitionType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "studentName", header: "Student Name" },
  { accessorKey: "enrollmentNumber", header: "Enrollment Number" },
  { accessorKey: "branch", header: "Branch" },
  { accessorKey: "batch", header: "Batch" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "competitionName", header: "Competition Name" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "teamName", header: "Team Name" },
  { accessorKey: "teamSize", header: "Team Size" },
  { accessorKey: "mentorName", header: "Mentor Name" },
  { accessorKey: "level", header: "Level" },
  { accessorKey: "organizer", header: "Organizer" },
  { accessorKey: "venue", header: "Venue" },
  { accessorKey: "problemStatement", header: "Problem Statement" },
  { accessorKey: "technologyUsed", header: "Technology Used" },
  { accessorKey: "priceMoney", header: "Price Money" },
  { accessorKey: "sponsoringAgency", header: "Sponsoring Agency" },
  { accessorKey: "positionSecured", header: "Position Secured" },
  {
    accessorKey: "projectGithubLink",
    header: "Project GitHub Link",
    cell: ({ row }) =>
      row.original.projectGithubLink ? (
        <a
          href={row.original.projectGithubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-primary"
        >
          GitHub
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "projectDescription", header: "Project Description" },
  {
    accessorKey: "certificatePdf",
    header: "Certificate PDF",
    cell: ({ row }) =>
      row.original.certificatePdf ? (
        <a
          href={row.original.certificatePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-primary"
        >
          View PDF
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "eventMode", header: "Event Mode" },
  { accessorKey: "achievement", header: "Achievement" },
  {
    id: "actions",
    header: "Action",
    cell: () => (
      <Fragment>
        <DasherTippy content="View">
          <Button variant="ghost btn-icon" size="sm" className="rounded-circle">
            <IconEye size={16} />
          </Button>
        </DasherTippy>
        <DasherTippy content="Edit">
          <Button variant="ghost btn-icon" size="sm" className="rounded-circle">
            <IconEdit size={16} />
          </Button>
        </DasherTippy>
        <DasherTippy content="Delete">
          <Button variant="ghost btn-icon" size="sm" className="rounded-circle">
            <IconTrash size={16} />
          </Button>
        </DasherTippy>
      </Fragment>
    ),
  },
];
