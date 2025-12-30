import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPageSizeSelector?: boolean;
  initialPageSize?: number;
  serverPagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number; // total pages from server
    onPageIndexChange: (index: number) => void;
    onPageSizeChange: (size: number) => void;
  };
};

export function DataTable<TData, TValue>({
  columns,
  data,
  showPageSizeSelector = true,
  initialPageSize = 10,
  serverPagination,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
    state: {
      sorting,
      columnVisibility,
      ...(serverPagination
        ? {
            pagination: {
              pageIndex: serverPagination.pageIndex ?? 0,
              pageSize: serverPagination.pageSize ?? initialPageSize,
            },
          }
        : {}),
    },
    manualPagination: Boolean(serverPagination),
    pageCount: serverPagination ? serverPagination.pageCount ?? 1 : undefined,
  });

  return (
    <div className="rounded-md shadow-sm bg-white border p-4 py-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = header.column.getCanSort();

                return (
                  <TableHead
                    key={header.id}
                    onClick={() => isSortable && header.column.toggleSorting()}
                    className={isSortable ? "cursor-pointer select-none" : ""}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {isSortable && (
                        <svg width="6" height="13" viewBox="0 0 6 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M5.86794 9.01792L3.40366 12.1156C3.16989 12.399 2.8095 12.399 2.58547 12.1156L0.12119 9.01792C-0.112577 8.72476 0.00430651 8.5 0.364696 8.5H5.62444C5.99457 8.5 6.10171 8.72476 5.86794 9.01792Z"
                            fill="#C4C4C4"
                          />
                          <path
                            d="M0.132058 3.98208L2.59634 0.884364C2.83011 0.600976 3.1905 0.600976 3.41453 0.884364L5.87881 3.98208C6.11258 4.27524 5.99569 4.5 5.6353 4.5L0.375564 4.5C0.00543451 4.5 -0.101708 4.27524 0.132058 3.98208Z"
                            fill="#C4C4C4"
                          />
                        </svg>
                      )}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-transparent">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-20 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-2 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-8 h-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => {
            const pageNumber = i + 1;
            const isCurrentPage = (table.getState().pagination?.pageIndex ?? 0) + 1 === pageNumber;

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (serverPagination) serverPagination.onPageIndexChange(pageNumber - 1);
                  table.setPageIndex(pageNumber - 1);
                }}
                className={`w-8 h-8 p-0 ${isCurrentPage ? "bg-[#FF5555] hover:bg-[#FF4444]" : ""}`}
              >
                {pageNumber}
              </Button>
            );
          })}

          {table.getPageCount() > 5 && (
            <>
              <span className="text-gray-500">...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                className="w-8 h-8 p-0 bg-transparent"
              >
                {table.getPageCount()}
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const nextIndex = (table.getState().pagination?.pageIndex ?? 0) + 1;
              if (serverPagination) serverPagination.onPageIndexChange(nextIndex);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className="w-8 h-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Items per page</span>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={table.getState().pagination?.pageSize ?? initialPageSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                if (serverPagination) serverPagination.onPageSizeChange(size);
                table.setPageSize(size);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}