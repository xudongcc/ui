import { type TableColumnProps } from "./TableColumnProps";

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  data: T[];
}
