import { type ReactNode } from "react";

import { Button, type ButtonProps } from "../button";
import { forwardRef } from "../utils";

export interface ActionProps extends ButtonProps {
  className?: string;
  content?: ReactNode;
  onAction?: () => Promise<void> | void;
}

export const Action = forwardRef<ActionProps, "button">(
  ({ content, onAction, ...props }, ref) => (
    <Button ref={ref} onClick={onAction} {...props}>
      {content}
    </Button>
  ),
);
