import { Content, type TabsContentProps } from "@radix-ui/react-tabs";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export const TabPanel: FC<PropsWithChildren<TabsContentProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Content className={twMerge(`mt-2`, className)} {...props}>
      {children}
    </Content>
  );
};
