"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentType {
  id: string;
  name: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  email: string;
  year: string;
  course: string;
  cgpa: string;
  dateOfBirth: string;
  gender: string;
  category: string;
  yearOfAdmission: string;
  yearOfGraduation: string;
  status: string;
  githubLink?: string;
  linkedinProfileLink?: string;
  parentsGuardianContactNumber: string;
  parentsGuardianName: string;
  address: string;
}

export const StudentColumns: ColumnDef<StudentType>[] = [
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
  { accessorKey: "name", header: "Name" },
  { accessorKey: "enrollmentNumber", header: "Enrollment Number" },
  { accessorKey: "branch", header: "Branch" },
  { accessorKey: "batch", header: "Batch" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "course", header: "Course" },
  { accessorKey: "cgpa", header: "CGPA" },
  { accessorKey: "dateOfBirth", header: "Date of Birth" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "yearOfAdmission", header: "Year of Admission" },
  { accessorKey: "yearOfGraduation", header: "Year of Graduation" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "githubLink",
    header: "GitHub Link",
    cell: ({ row }) =>
      row.original.githubLink ? (
        <a href={row.original.githubLink} target="_blank" rel="noopener noreferrer" className="text-decoration-underline text-primary">
          GitHub
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  {
    accessorKey: "linkedinProfileLink",
    header: "LinkedIn Profile",
    cell: ({ row }) =>
      row.original.linkedinProfileLink ? (
        <a href={row.original.linkedinProfileLink} target="_blank" rel="noopener noreferrer" className="text-decoration-underline text-primary">
          LinkedIn
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "parentsGuardianContactNumber", header: "Parents/Guardian Contact Number" },
  { accessorKey: "parentsGuardianName", header: "Parents/Guardian Name" },
  { accessorKey: "address", header: "Address" },
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
