import { type Meta } from "@storybook/react";
import { type FC } from "react";

import { Card } from "../card";
import { Tab } from "./tab";
import { TabList } from "./tab-list";
import { TabPanel } from "./tab-panel";
import { TabPanels } from "./tab-panels";
import { Tabs } from "./tabs";

const meta = {
  title: "Layout 布局/Tabs 标签栏",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default: FC = () => {
  return (
    <Tabs value="metrics">
      <TabList>
        <Tab value="metrics">Metrics</Tab>
        <Tab value="logs">Logs</Tab>
        <Tab value="revisions">Revisions</Tab>
        <Tab value="yaml">YAML</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="metrics">
          <Card>Metrics Content</Card>
        </TabPanel>
        <TabPanel value="logs">
          <Card>Logs Content</Card>
        </TabPanel>
        <TabPanel value="revisions">
          <Card>Revisions Content</Card>
        </TabPanel>
        <TabPanel value="yaml">
          <Card>YAML Content</Card>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
