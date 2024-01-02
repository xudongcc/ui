import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "../icon";
import { Spinner } from "../spinner";
import { type SVGComponent } from "../types/svg-component";
import { forwardRef } from "../utils";

export interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";

  icon?: SVGComponent;

  block?: boolean;

  rounded?: boolean;

  disabled?: boolean;

  loading?: boolean;

  size?: "sm" | "md" | "lg";

  type?: "button" | "reset" | "submit";
}

const sizeMap = {
  sm: twMerge(`px-3 py-1.5 text-xs font-normal`),
  md: twMerge(`px-3 py-2 text-sm font-medium`),
  lg: twMerge(`px-6 py-3 text-sm font-semibold`),
};

const variantMap = {
  primary: twMerge(`bg-primary text-primary hover:bg-primary/80`),
  secondary: twMerge(`bg-secondary text-secondary hover:bg-secondary/80`),
  destructive: twMerge(
    `bg-destructive text-destructive hover:bg-destructive/80`,
  ),
  outline: twMerge(`bg-transparent border text-default`),
  ghost: twMerge(`bg-transparent hover:bg-secondary text-default`),
  link: twMerge(
    `bg-transparent text-default underline-offset-4 hover:underline`,
  ),
};

const withoutContentSizeMap = {
  sm: twMerge(`p-1.5`),
  md: twMerge(`p-2`),
  lg: twMerge(`p-3`),
};

export const Button = forwardRef<ButtonProps, "button">(
  (
    {
      as,
      children,
      icon,
      variant = "secondary",
      block = false,
      rounded = false,
      disabled = false,
      loading = false,
      size = "md",
      className,
      type = "button",
      ...props
    },
    ref,
  ): ReactElement => {
    const Component = as ?? "button";

    return (
      <Component
        className={twMerge(
          // 基本类
          `relative cursor-pointer disabled:opacity-50 disabled:pointer-events-none`,
          sizeMap[size],
          typeof children === "undefined" && withoutContentSizeMap[size],
          variantMap[variant],
          block && `block w-full`,
          rounded ? `rounded-full` : `rounded-md`,
          className,
        )}
        disabled={disabled || loading}
        ref={ref}
        type={type}
        {...props}
      >
        {loading && variant !== "link" && (
          <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Spinner size={size} />
          </span>
        )}

        <span
          className={twMerge(
            `flex w-full justify-center items-center gap-1`,
            loading && variant !== "link" && `text-transparent`,
          )}
        >
          {typeof icon !== "undefined" && <Icon as={icon} size={size} />}

          {typeof children !== "undefined" && (
            <span className="text-center">{children}</span>
          )}
        </span>
      </Component>
    );
  },
);
