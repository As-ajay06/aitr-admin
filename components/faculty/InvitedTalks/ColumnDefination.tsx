"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface FacultyInvitedType {
  id: string;
  facultyName: string;
  titleOfTalk: string;
  eventName: string;
  organizingBody: string;
  date: string; // ISO string date
  natureOfEngagement: "Keynote" | "Panelist" | "Speaker";
  supportingDoc?: string; // URL to letter or certificate
}

export const InvitedTalks: ColumnDef<FacultyInvitedType>[] = [
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
  { accessorKey: "titleOfTalk", header: "Title of Talk/Session" },
  { accessorKey: "eventName", header: "Event Name" },
  { accessorKey: "organizingBody", header: "Organizing Body" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "natureOfEngagement", header: "Nature of Engagement" },
  {
    accessorKey: "supportingDoc",
    header: "Supporting Letter/Certificate",
    cell: ({ row }) =>
      row.original.supportingDoc ? (
        <a
          href={row.original.supportingDoc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-primary"
        >
          View Document
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
