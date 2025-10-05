"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentCertificateType {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  year: string;
  courseName: string;
  issuingOrganization: string;
  issueDate: string;
  validityPeriod: string;
  gradeOrScore: string;
  certificateDescription: string;
  modeOfLearning: string;
  courseDuration: string;
  rankOrPosition: string;
  certificatePdf?: string;
  relevanceToProgramOrBranch: string;
}

export const StudentCertificateColumns: ColumnDef<StudentCertificateType>[] = [
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
  { accessorKey: "courseName", header: "Course Name" },
  { accessorKey: "issuingOrganization", header: "Issuing Organization" },
  { accessorKey: "issueDate", header: "Issue Date" },
  { accessorKey: "validityPeriod", header: "Validity Period" },
  { accessorKey: "gradeOrScore", header: "Grade / Score" },
  { accessorKey: "certificateDescription", header: "Certificate Description" },
  { accessorKey: "modeOfLearning", header: "Mode of Learning" },
  { accessorKey: "courseDuration", header: "Course Duration" },
  { accessorKey: "rankOrPosition", header: "Rank / Position" },
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
  { accessorKey: "relevanceToProgramOrBranch", header: "Relevance to Program / Branch" },
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
