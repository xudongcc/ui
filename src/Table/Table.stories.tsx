import { type Meta } from "@storybook/react";
import dayjs from "dayjs";
import { type FC } from "react";

import { Card } from "../Card";
import { Table } from "./Table";

const meta = {
  title: "Advanced 高级/Table 表格",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

interface Service {
  name: string;
  url: string;
  lastDeployedAt: Date;
  lastDeployedUser: string;
}

const data: Service[] = [
  {
    name: "client",
    url: `https://client--example-project.example.app`,
    lastDeployedAt: new Date(),
    lastDeployedUser: "Xudong Huang",
  },
  {
    name: "server",
    url: `https://server--example-project.example.app`,
    lastDeployedAt: new Date(),
    lastDeployedUser: "Xudong Huang",
  },
  {
    name: "worker",
    url: `https://worker--example-project.example.app`,
    lastDeployedAt: new Date(),
    lastDeployedUser: "Xudong Huang",
  },
];

export const Base: FC = () => {
  return (
    <Card>
      <Table<Service>
        columns={[
          { title: "名称", field: "name" },
          {
            title: "URL",
            field: "url",
            render: (row) => (
              <a href={row.url} rel="noreferrer" target="_blank">
                {row.url}
              </a>
            ),
          },
          {
            title: "最后部署时间",
            field: "lastDeployedAt",
            render: (row) =>
              dayjs(row.lastDeployedAt).format("YYYY-MM-DD HH:mm:ss"),
          },
          { title: "部署者", field: "lastDeployedUser" },
        ]}
        data={data}
      />
    </Card>
  );
};
