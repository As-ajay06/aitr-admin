//import node module libraries
import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash, IconFileText } from "@tabler/icons-react";
import { Badge, Button } from "react-bootstrap";
import Link from "next/link";
import dayjs from "dayjs";

//import custom components
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

// ✅ Interface for data (optional but recommended)
export interface InstituteDocuments {

    aicteAffliationPdf: string;
    rgpvPdf: string;
    societyPdf: string;
    byLawsPdf: string;
}

// ✅ Columns
export const InstituteDocumentsColumns: ColumnDef<InstituteDocuments>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      );
    },
    cell: ({ row }) => (
      <div>
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "aicteAffliationPdf",
    header: "Affiliation Pdf",
    cell: ({ row }) => (
      <Button
        variant="ghost btn-icon"
        size="sm"
        className="rounded-circle"
        onClick={() => window.open(row.original.aicteAffliationPdf, "_blank")}
      >
        <IconFileText size={16} />
      </Button>
    ),
  },
  {
    accessorKey: "rgpvPdf",
    header: "RGPV PDF",
    cell: ({ row }) => (
      <Button
        variant="ghost btn-icon"
        size="sm"
        className="rounded-circle"
        onClick={() => window.open(row.original.rgpvPdf, "_blank")}
      >
        <IconFileText size={16} />
      </Button>
    ),
  },
  {
    accessorKey: "societyPdf",
    header: "Society PDF",
    cell: ({ row }) => (
      <Button
        variant="ghost btn-icon"
        size="sm"
        className="rounded-circle"
        onClick={() => window.open(row.original.societyPdf, "_blank")}
      >
        <IconFileText size={16} />
      </Button>
    ),
  },
  {
    accessorKey: "byLawsPdf",
    header: "By Laws Pdf",
    cell: ({ row }) => (
      <Button
        variant="ghost btn-icon"
        size="sm"
        className="rounded-circle"
        onClick={() => window.open(row.original.byLawsPdf, "_blank")}
      >
        <IconFileText size={16} />
      </Button>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <Fragment>
          <DasherTippy content="View">
            <Button
              href=""
              variant="ghost btn-icon"
              size="sm"
              className="rounded-circle"
            >
              <IconEye size={16} />
            </Button>
          </DasherTippy>
          <DasherTippy content="Edit">
            <Button
              href=""
              variant="ghost btn-icon"
              size="sm"
              className="rounded-circle"
            >
              <IconEdit size={16} />
            </Button>
          </DasherTippy>
          <DasherTippy content="Delete">
            <Button
              href=""
              variant="ghost btn-icon"
              size="sm"
              className="rounded-circle"
            >
              <IconTrash size={16} />
            </Button>
          </DasherTippy>
        </Fragment>
      );
    },
  },
];
