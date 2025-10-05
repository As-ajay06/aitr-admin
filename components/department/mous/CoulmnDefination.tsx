"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Badge, Button } from "react-bootstrap";
import Link from "next/link";

// custom components
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

// types
export interface MoUType {
  id: string;
  departmentName: string;
  agencyName: string;
  date: string;
  duration: string;
  description: string;
  funding: string;
  mouPdf?: string;
  title: string;
  industryName: string;
  signingDate: string;
  validityPeriod: string;
  purpose: string;
  supportReceived: string;
};

export const MouColumns : ColumnDef<MoUType>[] = [
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
      accessorKey: "mouPdf",
      header: "MoU PDF",
      cell: ({ row }) =>
        row.original.mouPdf ? (
          <Link
            href={row.original.mouPdf}
            target="_blank"
            className="text-decoration-underline text-primary"
          >
            View MoU
          </Link>
        ) : (
          <span className="text-muted">N/A</span>
        ),
    },
    { accessorKey: "title", header: "Title of MoU" },
    { accessorKey: "industryName", header: "Industry/Organization Name" },
    { accessorKey: "signingDate", header: "Date of Signing" },
    { accessorKey: "validityPeriod", header: "Validity Period" },
    { accessorKey: "purpose", header: "Purpose / Objectives" },
    { accessorKey: "supportReceived", header: "Fund / Support Received" },
    {
      id: "actions",
      header: "Action",
      cell: () => (
        <Fragment>
          <DasherTippy content="View">
            <Button
              variant="ghost btn-icon"
              size="sm"
              className="rounded-circle"
            >
              <IconEye size={16} />
            </Button>
          </DasherTippy>
          <DasherTippy content="Edit">
            <Button
              variant="ghost btn-icon"
              size="sm"
              className="rounded-circle"
            >
              <IconEdit size={16} />
            </Button>
          </DasherTippy>
          <DasherTippy content="Delete">
            <Button
              variant="ghost btn-icon"
              size="sm"
              className="rounded-circle"
            >
              <IconTrash size={16} />
            </Button>
          </DasherTippy>
        </Fragment>
      ),
    },
  ];

  export const dummyMoUData: MoUType[] = [
    {
        id: "1",
        departmentName: "Computer Science & Engineering",
        agencyName: "AICTE",
        date: "2024-01-15",
        duration: "3 Years",
        description: "Collaboration on AI & ML research projects.",
        funding: "₹10,00,000",
        mouPdf: "/files/mou-cse-aicte.pdf",
        title: "AI & ML Research MoU",
        industryName: "AICTE New Delhi",
        signingDate: "2024-01-15",
        validityPeriod: "2024 - 2027",
        purpose: "Enhance AI research, faculty training, and student internships.",
        supportReceived: "Research Grant and Training Support",
    },
    {
        id: "2",
        departmentName: "Electronics & Communication",
        agencyName: "ISRO",
        date: "2023-11-20",
        duration: "5 Years",
        description: "Satellite communication and IoT application development.",
        funding: "₹25,00,000",
        mouPdf: "/files/mou-ece-isro.pdf",
        title: "Satellite Communication MoU",
        industryName: "ISRO Bengaluru",
        signingDate: "2023-11-20",
        validityPeriod: "2023 - 2028",
        purpose: "Promote research in space technology and IoT.",
        supportReceived: "Research Grant, Lab Equipment",
    },
    {
        id: "3",
        departmentName: "Mechanical Engineering",
        agencyName: "Tata Motors",
        date: "2022-09-10",
        duration: "4 Years",
        description: "Skill development and automotive design training.",
        funding: "₹15,00,000",
        mouPdf: "/files/mou-mech-tatamotors.pdf",
        title: "Automotive Skill Development",
        industryName: "Tata Motors Pune",
        signingDate: "2022-09-10",
        validityPeriod: "2022 - 2026",
        purpose: "Improve mechanical engineering skills & industry readiness.",
        supportReceived: "Internships, Scholarships",
    },
    {
        id: "4",
        departmentName: "Civil Engineering",
        agencyName: "L&T Constructions",
        date: "2023-05-05",
        duration: "3 Years",
        description: "Green building and smart city planning initiatives.",
        funding: "₹12,00,000",
        mouPdf: "/files/mou-civil-lt.pdf",
        title: "Smart City Planning",
        industryName: "L&T Mumbai",
        signingDate: "2023-05-05",
        validityPeriod: "2023 - 2026",
        purpose: "Develop eco-friendly construction methods.",
        supportReceived: "Research Fund, Project Collaboration",
    },
    {
        id: "5",
        departmentName: "Information Technology",
        agencyName: "Google Cloud",
        date: "2024-02-01",
        duration: "2 Years",
        description: "Cloud computing & AI innovation hub setup.",
        funding: "₹20,00,000",
        mouPdf: "/files/mou-it-google.pdf",
        title: "Cloud Innovation MoU",
        industryName: "Google India",
        signingDate: "2024-02-01",
        validityPeriod: "2024 - 2026",
        purpose: "Provide cloud training, certifications, and research support.",
        supportReceived: "Cloud Credits, Training",
    },
];

