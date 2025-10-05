"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface FacultyCertificationType {
  id: string;
  facultyName: string;
  certificationName: string;
  issuingBody: string;
  certificationLevel: string; // Beginner, Advanced, etc.
  validityPeriod: string;
  fieldDomain: string;
  certificateUpload?: string;
}

export const FacultyCertificationColumns: ColumnDef<FacultyCertificationType>[] = [
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
  { accessorKey: "facultyName", header: "Faculty Name" },
  { accessorKey: "certificationName", header: "Certification Name" },
  { accessorKey: "issuingBody", header: "Issuing Body" },
  { accessorKey: "certificationLevel", header: "Certification Level" },
  { accessorKey: "validityPeriod", header: "Validity Period" },
  { accessorKey: "fieldDomain", header: "Field / Domain" },
  {
    accessorKey: "certificateUpload",
    header: "Certificate Upload",
    cell: ({ row }) =>
      row.original.certificateUpload ? (
        <Link
          href={row.original.certificateUpload}
          target="_blank"
          className="text-decoration-underline text-primary"
        >
          View Certificate
        </Link>
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
