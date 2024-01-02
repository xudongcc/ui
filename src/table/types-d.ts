import "@tanstack/react-table";

import { type RowData } from "@tanstack/table-core";

import { type TableColumnProps } from "./table-column-props";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    column: TableColumnProps<TData>;
  }
}
