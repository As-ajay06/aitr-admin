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
export interface ConsultancyType {
  id: string;
  departmentName: string;
  agencyName: string;
  date: string;
  duration: string;
  description: string;
  funding: string;
  pdfUrl?: string;
  titleOfConsultancy: string;
  clientOrIndustryPartner: string;
  facultyLead: string;
  amountSanctioned: string;
  supportingDocumentsUrl?: string;
}

export const ConsultancyColumns: ColumnDef<ConsultancyType>[] = [
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
    accessorKey: "pdfUrl",
    header: "Consultancy pdfUrl",
    cell: ({ row }) =>
      row.original.pdfUrl ? (
        <Link
          href={row.original.pdfUrl}
          target="_blank"
          className="text-decoration-underline text-primary"
        >
          View PDF
        </Link>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "titleOfConsultancy", header: "Title of Consultancy" },
  { accessorKey: "clientOrIndustryPartner", header: "Client / Industry Partner" },
  { accessorKey: "facultyLead", header: "Faculty Lead" },
  { accessorKey: "amountSanctioned", header: "Amount Sanctioned" },
  {
    accessorKey: "supportingDocuments",
    header: "Supporting Documents",
    cell: ({ row }) =>
      row.original.supportingDocumentsUrl ? (
        <Link
          href={row.original.supportingDocumentsUrl}
          target="_blank"
          className="text-decoration-underline text-success"
        >
          View Doc
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
