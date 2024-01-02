import { Content, type TabsContentProps } from "@radix-ui/react-tabs";
import { type FC, type PropsWithChildren } from "react";

export const TabPanel: FC<PropsWithChildren<TabsContentProps>> = ({
  children,

  ...props
}) => {
  return <Content {...props}>{children}</Content>;
};
