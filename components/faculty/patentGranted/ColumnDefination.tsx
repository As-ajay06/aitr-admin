"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface PatentType {
  id: string;
  facultyName: string;
  department: string;
  title: string;
  applicant: string;
  applicationNumber: string;
  applicationDate: string;
  status: string; // Published / Under Review
  coInventors: string;
  country: string;
  category: string;
  certificatePdf?: string;
  patentTitle: string;
  inventors: string;
  publicationDate: string;
  abstract: string;
}

export const PatentColumns: ColumnDef<PatentType>[] = [
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
  { accessorKey: "title", header: "Title" },
  { accessorKey: "applicant", header: "Applicant" },
  { accessorKey: "applicationNumber", header: "Application Number" },
  { accessorKey: "applicationDate", header: "Application Date" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "coInventors", header: "Co-Inventors" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "category", header: "Category" },
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
  { accessorKey: "patentTitle", header: "Patent Title" },
  { accessorKey: "inventors", header: "Inventors" },
  { accessorKey: "publicationDate", header: "Publication Date" },
  { accessorKey: "abstract", header: "Abstract" },
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
