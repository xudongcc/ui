import { type TabsTriggerProps, Trigger } from "@radix-ui/react-tabs";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const Tab: FC<PropsWithChildren<TabsTriggerProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Trigger
      className={twMerge(
        `inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface data-[state=active]:text-default data-[state=active]:shadow-sm`,
        className,
      )}
      {...props}
    >
      {children}
    </Trigger>
  );
};
