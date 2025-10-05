"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface FDPType {
  id: string;
  facultyName: string;
  department: string;
  fdpTitle: string;
  organizingInstitute: string;
  startDate: string;
  endDate: string;
  programType: string;
  mode: "Online" | "Offline" | "Hybrid";
  location: string;
  numberOfDays: number;
  certificatePdf?: string;
  outcome: string;
}

export const FDPColumns: ColumnDef<FDPType>[] = [
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
  { accessorKey: "facultyName", header: "Faculty Name" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "fdpTitle", header: "FDP Title" },
  { accessorKey: "organizingInstitute", header: "Organizing Institute" },
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "endDate", header: "End Date" },
  { accessorKey: "programType", header: "Program Type" },
  { accessorKey: "mode", header: "Mode" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "numberOfDays", header: "No. of Days" },
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
  { accessorKey: "outcome", header: "Outcome / Learning Highlights" },
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
