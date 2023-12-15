import {
  type CellContext,
  createColumnHelper,
  type DeepKeys,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactElement, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface TableColumnProps<T> {
  title: string;
  field: DeepKeys<T>;
  align?: "left" | "center" | "right";
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  data: T[];
}

export function Table<T>({ columns, data }: TableProps<T>): ReactElement {
  const columnHelper = createColumnHelper<T>();

  const reactTableColumns = columns.map((column) =>
    columnHelper.accessor(column.field, {
      header: column.title,
      cell: (ctx: CellContext<T, any>) => {
        return column.render?.(ctx.row.original) ?? ctx.renderValue();
      },
    }),
  );

  const table = useReactTable<T>({
    data,
    columns: reactTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-w-full">
      <div className="overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="t-0 sticky border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={twMerge(
                        "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                      )}
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      <div className="overflow-x-auto overflow-y-auto">
        <table className="w-full table-fixed">
          <tbody className="divide-y divide-gray-200 bg-surface">
            {table.getRowModel().rows.map((row) => (
              <tr className={twMerge("hover:bg-gray-50")} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={twMerge(
                      "break-words px-3 py-4 text-sm text-gray-500",
                    )}
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
