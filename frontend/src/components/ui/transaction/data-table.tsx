"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Input } from "../input"
import { Select } from "../select"
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../pagination"
import { PAYMENT_STATUS } from "@/constants/roles"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  // handleDeleteTrans: (...args: any[]) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  // handleDeleteTrans, 
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>("")
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(), // client-side pagination
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 8
      }
    }
  })
  console.log("cc: ", table.getFilteredRowModel().rows);
  const totalCurrentRow = table.getFilteredRowModel().rows;
  return (
    <>
      <div className="flex justify-between ">
        <div className="pb-3 flex">
          <Input className="min-w-100" placeholder="Search by payer username..."
            value={(table.getColumn("orderCode")?.getFilterValue() as string) ?? ""}
            onChange={(e) => {
              console.log(e.target.value)
              table.getColumn("orderCode")?.setFilterValue(e.target.value)

            }} />
        </div>

        <div className="">
          <Select defaultValue="all"
          onValueChange={(value) => {
            if(value === "all") {
              table.getColumn("status")?.setFilterValue("")
            } else {
              table.getColumn("status")?.setFilterValue(value);
            }
          }} >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>

                <SelectItem value="all">
                  Select status state
                </SelectItem>

                <SelectItem value={PAYMENT_STATUS.PENDING} >
                  Pending
                </SelectItem>
                <SelectItem value={PAYMENT_STATUS.PAID}>
                  Paid
                </SelectItem>

                <SelectItem value={PAYMENT_STATUS.FAILED}>
                  Failed
                </SelectItem>

                <SelectItem value={PAYMENT_STATUS.CANCELLED}>
                  Cancelled
                </SelectItem>
                
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="text-center" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="text-center justify-center items-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="font-bold]">
            <p className="font-bold p-3">Total: {totalCurrentRow.length} {totalCurrentRow.length > 1 ? "transactions" : "transaction"}</p>
          </TableFooter>
        </Table>
      </div>
      <div>
        <Pagination className="">
          <PaginationContent className="">
            <PaginationItem >
              <PaginationPrevious className="hover:opacity-0" href="#" onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }} />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="hover:opacity-0" href="#" onClick={(e) => {
                e.preventDefault();
                table.nextPage();
              }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}