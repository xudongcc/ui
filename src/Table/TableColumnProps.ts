import type { DeepKeys } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface TableColumnProps<T> {
  title: string;
  field: DeepKeys<T>;
  align?: "left" | "center" | "right";
  render?: (row: T) => ReactNode;
}
