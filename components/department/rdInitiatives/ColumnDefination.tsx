"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

// custom components
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

// types
export interface RdInitiatives {
  id: string;
  departmentName: string;
  agencyName: string;
  date: string;
  duration: string;
  description: string;
  funding: string;
  fileId?: string;
  projectTitle: string;
  fundingAgency: string;
  principalInvestigator: string;
  coInvestigator?: string;
  budget: string;
  outputs?: string; // patents / publications / outcomes
}

export const RndColumns: ColumnDef<RdInitiatives>[] = [
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
  { accessorKey: "departmentName", header: "Department Name" },
  { accessorKey: "agencyName", header: "Agency Name" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "duration", header: "Duration" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "funding", header: "Funding" },
  {
    accessorKey: "fileId",
    header: "Project fileId",
    cell: ({ row }) =>
      row.original.fileId ? (
        <Link
          href={row.original.fileId}
          target="_blank"
          className="text-decoration-underline text-primary"
        >
          View PDF
        </Link>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "projectTitle", header: "Project Title" },
  { accessorKey: "fundingAgency", header: "Funding Agency" },
  { accessorKey: "principalInvestigator", header: "Principal Investigator (PI)" },
  { accessorKey: "coInvestigator", header: "Co-Investigator" },
  { accessorKey: "budget", header: "Budget" },
  { accessorKey: "outputs", header: "Outputs / Patents / Publications" },
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
