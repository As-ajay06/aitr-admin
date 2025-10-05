"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Button } from "react-bootstrap";
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

export interface CourseScholarshipType {
  id: string;
  courseName: string;
  scholarship?: string;
  instituteName: string;
  city: string;
  country: string;
  duration: string;
  admissionYear: string;
}

export const CourseScholarshipColumns: ColumnDef<CourseScholarshipType>[] = [
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
  { accessorKey: "courseName", header: "Name of the Course" },
  {
    accessorKey: "scholarship",
    header: "Scholarship",
    cell: ({ row }) =>
      row.original.scholarship ? (
        <span>{row.original.scholarship}</span>
      ) : (
        <span className="text-muted">N/A</span>
      ),
  },
  { accessorKey: "instituteName", header: "Name of the Institute" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "duration", header: "Duration of Program" },
  { accessorKey: "admissionYear", header: "Admission Year" },
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
