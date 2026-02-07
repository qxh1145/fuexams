import { AdminSidebar } from "@/components/admin-sidebar";
import SidebarLayout from "@/pages/Sidebar";

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteUser, getAllUser, updateUser, type Users } from "@/features/users/userSlice.ts"
import { AlertDialogButton } from "@/components/alert-dialog-button";
import axiosClient from "@/service/axiosClient";
import EditUserDialog from "./EditUserDialog";



const ActionCell = ({ row }: { row: any }) => {
  const thisUser = row.original;
  const dispatch = useAppDispatch();
  const id = row.original._id;
  const [formData, setFormData] = React.useState({
    email: thisUser.email || "",
    username: thisUser.username || "",
    role: thisUser.role || ""
  })

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(id));
    console.log("id: ", id)

  }
  return (
    <div className="flex gap-2">
      {/* // <Button variant="destructive" onClick={handleDeleteUser}>Delete</Button> */}
      <AlertDialogButton userId={id} handleDeleteUser={handleDeleteUser} />
      {/* <Button onClick={() => handleUpdateUser}>Update Infomation</Button> */}
      <EditUserDialog user={row.original}></EditUserDialog>
    </div>
  )
}
export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => (
      <p>{row.getValue("_id")}</p>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div>{row.getValue("email")}</div>
    )
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div>{row.getValue("role")}</div>
    )
  },
  {
    header: "Modify",
    cell: ({ row }) => (
      <ActionCell row={row} />
    )
  }
]


const ModifyUserPage = () => {
  const { users } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  console.log("test: ", users)

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data: users || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  //logic function
  //su dung ActionCell de handle cac nut bam 


  const [isEdited, setIsEdited] = React.useState(false);

  return (
    <SidebarLayout sidebar={<AdminSidebar />}>
      <div className="w-full p-5">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            Total: {users.length} users.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )

}

export default ModifyUserPage 