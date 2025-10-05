"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import Link from "next/link";

import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface FacultyPublicationType {
  id: string;
  facultyName: string;
  titleOfPaper: string;
  publicationDate: string; // ISO Date string
  journalConferenceName: string;
  coAuthor: string;
  indexing: string;
  paperPdf?: string;
  issnNumber: string;
  doiLink?: string;
  authors: string;
  issnIsbn: string;
  department: string;
}

export const FacutlyResearchPaperPublication : ColumnDef<FacultyPublicationType>[] = [
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
  { accessorKey: "titleOfPaper", header: "Title of Paper" },
  { accessorKey: "publicationDate", header: "Publication Date" },
  { accessorKey: "journalConferenceName", header: "Journal / Conference Name" },
  { accessorKey: "coAuthor", header: "Co-Author" },
  { accessorKey: "indexing", header: "Indexing (SCI, SCOPUS, etc.)" },
  {
    accessorKey: "paperPdf",
    header: "Paper PDF",
    cell: ({ row }) =>
      row.original.paperPdf ? (
        <Link href={row.original.paperPdf} target="_blank" className="text-decoration-underline text-primary">
          View PDF
        </Link>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "issnNumber", header: "ISSN Number" },
  {
    accessorKey: "doiLink",
    header: "DOI Link",
    cell: ({ row }) =>
      row.original.doiLink ? (
        <Link href={row.original.doiLink} target="_blank" className="text-decoration-underline text-primary">
          DOI
        </Link>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "authors", header: "Authors" },
  { accessorKey: "issnIsbn", header: "ISSN / ISBN" },
  { accessorKey: "department", header: "Department" },

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
