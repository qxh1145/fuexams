"use client"

import type { PaymentStatus } from "@/constants/roles";
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "../button";
import { Delete, EditIcon, Trash2 } from "lucide-react";
import { ButtonGroup } from "../button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteTransaction, type DeleteInput } from "@/features/payment/transactionSlice";

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

const ActionCell = ({ row }: { row: any }) => {
  const dispatch = useAppDispatch();

  const handleDeleteTransaction = async (orderCode: number) => {
    try {
      const result = await dispatch(deleteTransaction({ orderCode })).unwrap();
      if (result) {
        toast.success( "Delete success"); 
      }
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ButtonGroup className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => handleDeleteTransaction(row.original.orderCode)}
              className="hover:-translate-y-1"
              size={"icon-sm"}
              variant={"ghost"}
            >
              <Trash2 color="red" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Delete this row</p></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="hover:-translate-y-1" size={"icon-sm"} variant={"ghost"}>
              <EditIcon color="blue" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Edit this row</p></TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

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
    cell: ({ row }) => 
      <ActionCell row={row} />
    
  }
]