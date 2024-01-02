import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useState } from "react";

import { Radio } from "./radio";

const meta = {
  title: "Form 表单/Radio 单选框",
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    label: "Radio",
  },
};

export const Checked: Story = {
  args: {
    label: "Radio",
    checked: true,
    onChange: () => {},
  },
};

export const Description: Story = {
  args: {
    label: "Radio",
    helpText: "This is a description",
  },
};

export const Controlled: FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Radio
      checked={checked}
      helpText="This is a description"
      label="Radio"
      name="status"
      onChange={(event) => {
        console.log("checked = ", event.target.checked);
        setChecked(event.target.checked);
      }}
    />
  );
};
