"use client";

import { Fragment } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Badge, Button, Image } from "react-bootstrap";
import Link from "next/link";

// custom components
import DasherTippy from "components/common/DasherTippy";
import Checkbox from "components/table/Checkbox";

// types
import { ProductListType } from "types/EcommerceType";

export const useProductColumns = (): ColumnDef<ProductListType>[] => {
  return [
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
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const { name, imageSrc } = row.original;
        return (
          <div className="d-flex align-items-center">
            <Image
              src={imageSrc}
              alt={name}
              className="rounded-3"
              width="56"
            />
            <div className="ms-3 d-flex flex-column">
              <Link href="#!" className="text-inherit fw-semibold">
                {name}
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "addedDate",
      header: "Added Date",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>${row.original.price}</span>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusText = row.original.status;
        return (
          <Badge
            bg={`${statusText === "Active" ? "success-subtle" : "danger-subtle"}`}
            text={`${
              statusText === "Active" ? "success-emphasis" : "danger-emphasis"
            }`}
            pill
          >
            {statusText}
          </Badge>
        );
      },
    },
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
};
