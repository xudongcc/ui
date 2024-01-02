import { type DetailedHTMLProps, type FC, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const TabPanels: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div className={twMerge(`mt-2`, className)} {...props}>
      {children}
    </div>
  );
};
