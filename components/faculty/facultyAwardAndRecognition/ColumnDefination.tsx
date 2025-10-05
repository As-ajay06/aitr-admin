"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface AwardType {
  id: string;
  recipientName: string;
  department: string;
  awardName: string;
  issuingOrganization: string;
  date: string; // ISO string or formatted date
  category: string;
  eventName: string;
  description: string;
  certificatePdf?: string;
  titleOfAward: string;
  level: "Institute" | "State" | "National" | "International";
  supportingDocument?: string;
}

export const FacultyAwardColumns: ColumnDef<AwardType>[] = [
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
  { accessorKey: "recipientName", header: "Recipient Name" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "awardName", header: "Award Name" },
  { accessorKey: "issuingOrganization", header: "Issuing Organization" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "eventName", header: "Event Name" },
  { accessorKey: "description", header: "Description / Purpose" },
  {
    accessorKey: "certificatePdf",
    header: "Certificate PDF",
    cell: ({ row }) =>
      row.original.certificatePdf ? (
        <Link href={row.original.certificatePdf} target="_blank" className="text-decoration-underline text-primary">
          View Certificate
        </Link>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "titleOfAward", header: "Title of Award" },
  { accessorKey: "level", header: "Level" },
  {
    accessorKey: "supportingDocument",
    header: "Supporting Document",
    cell: ({ row }) =>
      row.original.supportingDocument ? (
        <Link href={row.original.supportingDocument} target="_blank" className="text-decoration-underline text-primary">
          View Document
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

