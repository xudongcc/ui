import { List, type TabsListProps } from "@radix-ui/react-tabs";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const TabList: FC<PropsWithChildren<TabsListProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <List
      className={twMerge(
        `h-10 items-center justify-center rounded-md bg-muted p-1 text-muted`,
        className,
      )}
      {...props}
    >
      {children}
    </List>
  );
};
