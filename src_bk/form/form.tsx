import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface FormProps {
  className?: string;
}

export const Form = forwardRef<FormProps, "form">(
  ({ as: As = "form", className, children, ...props }, ref) => {
    return (
      <As className={twMerge("grid gap-y-4", className)} ref={ref} {...props}>
        {children}
      </As>
    );
  },
);
