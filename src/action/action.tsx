import { type ReactElement, type ReactNode } from "react";

import { Button } from "../button";
import { type As, type PropsOf, type RightJoinProps } from "../types";

export type ActionProps<Component extends As = typeof Button> = RightJoinProps<
  PropsOf<Component>,
  { as?: Component; content?: ReactNode; onAction?: () => Promise<void> | void }
>;

export function Action<Component extends As = typeof Button>({
  content,
  onAction,
  ...props
}: ActionProps<Component>): ReactElement {
  return (
    <Button onClick={onAction} {...props}>
      {content}
    </Button>
  );
}
