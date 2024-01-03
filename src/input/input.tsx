import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../form";
import { forwardRef } from "../utils";

export interface InputProps extends FormItemProps {
  disabled?: boolean;

  size?: "sm" | "md" | "lg";

  prefix?: ReactNode;

  suffix?: ReactNode;

  placeholder?: string;

  value?: string;

  onChange?: (value: string) => void;

  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

const sizeMap = {
  sm: twMerge(`py-1`),
  md: twMerge(`py-2`),
  lg: twMerge(`py-2`),
};

export const Input = forwardRef<InputProps, "input">(
  (
    {
      children,
      label,
      helpText,
      error,
      disabled = false,
      size = "md",
      className,
      prefix,
      suffix,
      value,
      type = "text",
      onChange,
      ...props
    },
    ref,
  ) => {
    return (
      <FormItem
        className={className}
        error={error}
        helpText={helpText}
        label={label}
      >
        <div
          className={twMerge(
            "flex gap-2 rounded-md px-3 shadow-sm",
            "w-full ring-1 ring-inset focus-within:bg-gray-50 focus-within:text-gray-500 focus-within:ring-2 focus-within:ring-inset ring-gray-300 focus-within:ring-indigo-600",
            typeof label !== "undefined" && "mt-2",
            typeof error !== "undefined" &&
              `ring-red-300 focus-within:ring-red-500`,
            sizeMap[size],
          )}
        >
          {typeof prefix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-500">{prefix}</span>
            </div>
          )}

          <input
            className={twMerge(
              "flex-1 min-w-0 border-0 bg-inherit p-0 text-sm focus:ring-0 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-400",
              typeof error !== "undefined" &&
                `text-red-900 placeholder:text-red-300`,
              type === "number" &&
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            )}
            disabled={disabled}
            ref={ref}
            type={type}
            value={value ?? ""}
            onChange={(event) => onChange?.(event.target.value)}
            {...props}
          />

          {typeof suffix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-500">{suffix}</span>
            </div>
          )}
        </div>
      </FormItem>
    );
  },
);
