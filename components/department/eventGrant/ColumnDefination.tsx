"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "react-bootstrap";
import Link from "next/link";

// icons
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";

// custom components
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";


// types
export interface EventGrantType {
  id?: string;
  category: string;
  createdAt: string;
  dateOfApproval: string;
  departmentName: string;
  description: string;
  duration: string;
  eventTitle:string,
  facultyCoordinator:string,
  funding:string,
  grantAmount:string,
  grantingAgency:string,
  numberOfParticipants:number,
  pdfUrl:string,
  purpose:string,
  typeOfEvent:string,
  updatedAt:string,
  utilizationSummary:string,
  _id?: string
}


export const EventGrantColumns: ColumnDef<EventGrantType>[] = [
  {
    accessorKey: "eventTitle",
    header: "Event Title",
  },
  {
    accessorKey: "departmentName",
    header: "Department Name",
  },
  {
    accessorKey: "grantingAgency",
    header: "Granting Agency",
  },
  {
    accessorKey: "dateOfApproval",
    header: "Date of Approval",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "funding",
    header: "Funding",
  },
  {
    accessorKey: "grantAmount",
    header: "Grant Amount",
  },
  {
    accessorKey: "facultyCoordinator",
    header: "Faculty Coordinator",
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
  {
    accessorKey: "utilizationSummary",
    header: "Utilization Summary",
  },
  {
    accessorKey: "numberOfParticipants",
    header: "No. of Participants",
  },
  {
    accessorKey: "typeOfEvent",
    header: "Type of Event",
  },
  {
    accessorKey: "pdfUrl",
    header: "PDF",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];


