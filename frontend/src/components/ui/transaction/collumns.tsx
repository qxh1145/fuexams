"use client"

import type { PaymentStatus } from "@/constants/roles";
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "../button";
import { Delete, EditIcon } from "lucide-react";
import { ButtonGroup } from "../button-group";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  _id: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  orderCode: number;
  planId: string;
  amount: number;
  status: PaymentStatus;
  paymentDate: string;
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "userId.username",
    header: "Payer Username",
    cell: ({ row }) => {
      const username = row.getValue("userId_username") as string; //tanstack thay dau . bang _
      return <div>{!username ? "N/A" : username}</div>
    }
  },
  {
    accessorKey: "userId.email",
    header: "Payer Email",
    cell: ({ row }) => {
      const email = row.getValue("userId_email") as string;
      return <div>{!email ? "N/A" : email}</div>
    }
  },
  {
    accessorKey: "orderCode",
    header: "Order Code",
  },
  {
    accessorKey: "planId",
    header: "Plan ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("paymentDate") as string;

      const fomattedDate = new Date(rawDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      })
      const fomattedTime = new Date(rawDate).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit"
      })
      return (
        <div>{fomattedDate} at {fomattedTime}</div>
      )
    }
  },
  {
    header: "Tool",
    cell: ({ row }) => {
      return (
        <div className="">
          <ButtonGroup className="flex justify-right">
            <Button size={"icon-sm"} variant={"ghost"}><Delete /></Button>
            <Button size={"icon-sm"} variant={"ghost"}><EditIcon /></Button>
          </ButtonGroup>

        </div>
      )
    }
  }
]