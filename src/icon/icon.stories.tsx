import { TrashIcon } from "@heroicons/react/24/outline";
import type { Meta } from "@storybook/react";
import { type FC } from "react";

import page from "../icon/icon.mdx";
import { Icon } from "./icon";

export default {
  title: "Base 基础/Icon 图标",
  component: Icon,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Icon>;

export const Default: FC = (args) => {
  return <Icon as={TrashIcon} {...args} />;
};
