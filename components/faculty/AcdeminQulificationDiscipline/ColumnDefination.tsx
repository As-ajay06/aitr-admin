"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface HighestDegreeType {
  id: string;
  highestDegree: string;
  university: string;
  specialization: string;
  yearOfCompletion: string;
  certificateUrl?: string;
}

export const HighestDegreeColumns: ColumnDef<HighestDegreeType>[] = [
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
  { accessorKey: "highestDegree", header: "Highest Degree Earned" },
  { accessorKey: "university", header: "University/Institute" },
  { accessorKey: "specialization", header: "Specialization" },
  { accessorKey: "yearOfCompletion", header: "Year of Completion" },
  {
    accessorKey: "certificateUrl",
    header: "Supporting Document",
    cell: ({ row }) =>
      row.original.certificateUrl ? (
        <Link
          href={row.original.certificateUrl}
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
