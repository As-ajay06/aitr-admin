"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentSportsEventType {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  sportsName: string;
  eventDate: string;
  eventName: string;
  eventLevel: string;
  eventLocation: string;
  position: string;
  certificatePdf?: string;
  coachName: string;
  organizer: string;
}

export const StudentSportsEventColumns: ColumnDef<StudentSportsEventType>[] = [
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
  { accessorKey: "studentName", header: "Student Name" },
  { accessorKey: "enrollmentNumber", header: "Enrollment Number" },
  { accessorKey: "branch", header: "Branch" },
  { accessorKey: "batch", header: "Batch" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "sportsName", header: "Sports Name" },
  { accessorKey: "eventDate", header: "Event Date" },
  { accessorKey: "eventName", header: "Event Name" },
  { accessorKey: "eventLevel", header: "Event Level" },
  { accessorKey: "eventLocation", header: "Event Location" },
  { accessorKey: "position", header: "Position" },
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
          View Certificate
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "coachName", header: "Coach Name" },
  { accessorKey: "organizer", header: "Organizer" },
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
