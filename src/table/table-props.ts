import { type TableColumnProps } from "./table-column-props";

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  data: T[];
}
