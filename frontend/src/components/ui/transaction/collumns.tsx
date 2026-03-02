"use client";

import { PAYMENT_STATUS, type PaymentStatus } from "@/constants/roles";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../button";
import { Delete, EditIcon, Trash2 } from "lucide-react";
import { ButtonGroup } from "../button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  deleteTransaction,
  type DeleteInput,
} from "@/features/payment/transactionSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
};

const ActionCell = ({ row }: { row: any }) => {
  const dispatch = useAppDispatch();
  const status = row.getValue("status") as string;

  const handleDeleteTransaction = async (orderCode: number) => {
    try {
      const result = await dispatch(deleteTransaction({ orderCode })).unwrap();
      if (result) {
        toast.success("Delete success");
      }
    } catch (error: any) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ButtonGroup className="flex gap-2">
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  className="hover:-translate-y-1"
                  size={"icon-sm"}
                  variant={"ghost"}
                >
                  <Trash2 color="red" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete this row</p>
            </TooltipContent>
          </Tooltip>

          <AlertDialogContent>
            <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
            <AlertDialogDescription>
              This action cannot be undo once you process.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteTransaction(row.original.orderCode)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger>
                <Button
                  className="hover:-translate-y-1"
                  size={"icon-sm"}
                  variant={"ghost"}
                >
                  <EditIcon color="blue" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit this row</p>
            </TooltipContent>
          </Tooltip>

          <AlertDialogContent>
            <AlertDialogHeader>Edit user panel</AlertDialogHeader>
            <AlertDialogContent>
              <div>
                <label>Status</label>
                <Select defaultValue={status}>
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder={status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={PAYMENT_STATUS.PENDING}>{PAYMENT_STATUS.PENDING}</SelectItem>
                      <SelectItem value={PAYMENT_STATUS.CANCELLED}>{PAYMENT_STATUS.CANCELLED}</SelectItem>
                      <SelectItem value={PAYMENT_STATUS.FAILED}>{PAYMENT_STATUS.FAILED}</SelectItem>
                      <SelectItem value={PAYMENT_STATUS.PAID}>{PAYMENT_STATUS.PAID}</SelectItem>
                      <SelectItem value={PAYMENT_STATUS.REFUND}>{PAYMENT_STATUS.REFUND}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </AlertDialogContent>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ButtonGroup>
    </div>
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "userId.username",
    header: "Payer Username",
    filterFn: (row, columnId, filterValue) => {
      const username = row.getValue(columnId) as string;
      if (!username) {
        return false;
      }
      return username
        .toLowerCase()
        .includes((filterValue as string).toLowerCase());
    },
    cell: ({ row }) => {
      const username = row.getValue("userId_username") as string; //tanstack thay dau . bang _
      return <div>{!username ? "N/A" : username}</div>;
    },
  },
  {
    accessorKey: "userId.email",
    header: "Payer Email",
    cell: ({ row }) => {
      const email = row.getValue("userId_email") as string;
      return <div>{!email ? "N/A" : email}</div>;
    },
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
    header: "Status",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => {
      const rawDate = row.getValue("paymentDate") as string;

      const fomattedDate = new Date(rawDate).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
      const fomattedTime = new Date(rawDate).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <div>
          {fomattedDate} at {fomattedTime}
        </div>
      );
    },
  },
  {
    header: "Tool",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
