"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentPlacementType {
  id: string;
  studentName: string;
  companyName: string;
  companyLocation: string;
  roleOffered: string;
  branch: string;
  batch: string;
  year: string;
  placementType: "ON CAMPUS" | "OFF CAMPUS";
  package: string;
  joiningDate: string;
  offerLetterPdf?: string;
}

export const StudentPlacementColumns: ColumnDef<StudentPlacementType>[] = [
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
  { accessorKey: "companyName", header: "Company Name" },
  { accessorKey: "companyLocation", header: "Company Location" },
  { accessorKey: "roleOffered", header: "Role Offered" },
  { accessorKey: "branch", header: "Branch" },
  { accessorKey: "batch", header: "Batch" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "placementType", header: "Placement Type" },
  { accessorKey: "package", header: "Package" },
  { accessorKey: "joiningDate", header: "Joining Date" },
  {
    accessorKey: "offerLetterPdf",
    header: "Offer Letter PDF",
    cell: ({ row }) =>
      row.original.offerLetterPdf ? (
        <a
          href={row.original.offerLetterPdf}
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
