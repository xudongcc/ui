import { Root, type TabsProps } from "@radix-ui/react-tabs";
import { type FC, type PropsWithChildren } from "react";

export const Tabs: FC<PropsWithChildren<TabsProps>> = ({
  children,
  ...props
}) => {
  return <Root {...props}>{children}</Root>;
};
