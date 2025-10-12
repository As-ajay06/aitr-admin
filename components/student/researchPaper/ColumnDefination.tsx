"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface StudentPaperType {
  id: string;
  studentName: string;
  enrollmentNumber: string;
  branch: string;
  batch: string;
  doiIsbn: string;
  titleOfPaper: string;
  publicationDate: string;
  journalConferenceName: string;
  coAuthor: string;
  indexing: string; // e.g., SCOPUS, SCI, etc.
  paperPdf?: string;
  facultyGuide: string;
}

export const StudentResearchPaperColumns: ColumnDef<StudentPaperType>[] = [
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
  { accessorKey: "studentName", header: "Student Name" },
  { accessorKey: "enrollmentNumber", header: "Enrollment Number" },
  { accessorKey: "branch", header: "Branch" },
  { accessorKey: "batch", header: "Batch" },
  { accessorKey: "doiIsbn", header: "DOI/ISBN" },
  { accessorKey: "titleOfPaper", header: "Title of Paper" },
  { accessorKey: "publicationDate", header: "Publication Date" },
  { accessorKey: "journalConferenceName", header: "Journal/Conference Name" },
  { accessorKey: "coAuthor", header: "Co-Author(s)" },
  { accessorKey: "indexing", header: "Indexing (SCOPUS, SCI, etc.)" },
  {
    accessorKey: "paperPdf",
    header: "Paper PDF",
    cell: ({ row }) =>
      row.original.paperPdf ? (
        <a
          href={row.original.paperPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-underline text-primary"
        >
          View Paper
        </a>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "facultyGuide", header: "Faculty Guide" },
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
