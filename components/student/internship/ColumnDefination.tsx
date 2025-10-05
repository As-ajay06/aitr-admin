"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentInternshipType {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  companyName: string;
  internshipRole: string;
  modeOfInternship: string;
  stipend: string;
  startDate: string;
  endDate: string;
  certificateReportUpload?: string;
  technologyUsed: string;
  projectName: string;
  projectDescription: string;
  companyLocation: string;
  areaOfWork: string;
}

export const StudentInternshipColumns: ColumnDef<StudentInternshipType>[] = [
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
  { accessorKey: "companyName", header: "Company Name" },
  { accessorKey: "internshipRole", header: "Internship Role" },
  { accessorKey: "modeOfInternship", header: "Mode of Internship" },
  { accessorKey: "stipend", header: "Stipend" },
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "endDate", header: "End Date" },
  {
    accessorKey: "certificateReportUpload",
    header: "Certificate / Report",
    cell: ({ row }) =>
      row.original.certificateReportUpload ? (
        <a
          href={row.original.certificateReportUpload}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-primary"
        >
          View
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "technologyUsed", header: "Technology Used" },
  { accessorKey: "projectName", header: "Project Name" },
  { accessorKey: "projectDescription", header: "Project Description" },
  { accessorKey: "companyLocation", header: "Company Location" },
  { accessorKey: "areaOfWork", header: "Area of Work" },
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
