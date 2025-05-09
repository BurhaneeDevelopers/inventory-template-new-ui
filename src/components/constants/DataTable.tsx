import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, Edit, Printer, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import EditMasterPopUp from '../blocks/master/EditMasterPopUp'
import { DeletePopUp } from '../blocks/master/DeletePopUp'
import { useAtom } from 'jotai'
import { editRowAtom, isEditingAtom } from '../../../jotai/jotaiStore'
import moment from 'moment'

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  fieldConfig?: object
  setData?: (values: any) => void
}

export function DataTable<TData>({ columns, data, fieldConfig, setData }: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    Object.fromEntries(
      columns.map((col, index) => [col.accessorKey!, index < 5]), // First 5 visible
    ),
  )
  const [rowSelection, setRowSelection] = React.useState({})
  const [, setIsEditing] = useAtom(isEditingAtom)
  const [, setEditRowId] = useAtom(editRowAtom)

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Data..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='-translate-x-3'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
                <TableHead>
                  Actions
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => {
                    const value = cell.getValue();
                    const isTransactionDate = cell.column.id === 'transactionDate';

                    return (
                      <TableCell key={cell.id}>
                        {value != null
                          ? isTransactionDate
                            ? moment(value).format("DD MMM YYYY")
                            : flexRender(cell.column.columnDef.cell, cell.getContext())
                          : "NA"}
                      </TableCell>
                    );
                  })}

                  <TableCell key={row.id} className='flex gap-2'>
                    {!fieldConfig ? <Button className="bg-orange-500"
                      onClick={
                        () => {
                          setIsEditing(true);
                          setEditRowId(row.original);
                        }
                      }>
                      <Edit color="#fff" size={18} />
                    </Button> :
                      <EditMasterPopUp data={row.original} fieldConfig={fieldConfig} setData={setData} />
                    }
                    <DeletePopUp id={row.original.id} isTransaction={fieldConfig ? false : true} />
                    <Button className="bg-indigo-500" disabled>
                      <Printer color="#fff" size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results to show.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
  )
}
