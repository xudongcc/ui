import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface FormItemProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  helpText?: string;
  error?: string;
}

export const FormItem = forwardRef<FormItemProps, "div">(
  ({ children, className, label, helpText, error }, ref) => {
    return (
      <div className="w-full" ref={ref}>
        {typeof label !== "undefined" && (
          <label
            className={twMerge(
              "block font-medium leading-6 text-gray-900 text-sm",
              className,
            )}
            htmlFor={label}
          >
            {label}
          </label>
        )}

        <div className={twMerge(typeof label !== "undefined" && "mt-2")}>
          {children}
        </div>

        {(typeof error !== "undefined" || typeof helpText !== "undefined") && (
          <p
            className={twMerge(
              `mt-2 text-sm`,
              typeof error !== "undefined" && `text-red-600`,
              typeof error === "undefined" &&
                typeof helpText !== "undefined" &&
                `text-gray-500`,
            )}
          >
            {error ?? helpText}
          </p>
        )}
      </div>
    );
  },
);
