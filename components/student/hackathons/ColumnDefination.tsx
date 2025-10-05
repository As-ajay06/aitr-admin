"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface HackathonType {
  id: string;
  hackathonName: string;
  organizer: string;
  teamDetails: string;  // e.g., list of members or a summary
  result: string;       // Selected / Winner / Finalist
  eventDate: string;
  teamName: string;
  teamSize: number;
  mentorName: string;
  venue: string;
  problemStatement: string;
  technologyUsed: string;
  priceMoney?: string;
  positionSecured?: string;
}

export const HackathonColumns: ColumnDef<HackathonType>[] = [
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
  { accessorKey: "hackathonName", header: "Hackathon Name" },
  { accessorKey: "organizer", header: "Organizer" },
  { accessorKey: "teamDetails", header: "Team Details" },
  { accessorKey: "result", header: "Result" },
  { accessorKey: "eventDate", header: "Event Date" },
  { accessorKey: "teamName", header: "Team Name" },
  { accessorKey: "teamSize", header: "Team Size" },
  { accessorKey: "mentorName", header: "Mentor Name" },
  { accessorKey: "venue", header: "Venue" },
  { accessorKey: "problemStatement", header: "Problem Statement" },
  { accessorKey: "technologyUsed", header: "Technology Used" },
  {
    accessorKey: "priceMoney",
    header: "Price Money",
    cell: ({ row }) => row.original.priceMoney || <span className="text-muted">N/A</span>,
  },
  {
    accessorKey: "positionSecured",
    header: "Position Secured",
    cell: ({ row }) => row.original.positionSecured || <span className="text-muted">N/A</span>,
  },
  {
    id: "actions",
    header: "Actions",
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
