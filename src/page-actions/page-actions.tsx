import { type ReactElement } from "react";

import { Action, type ActionProps } from "../action";
import { type Button } from "../button";
import { ButtonGroup } from "../button-group";
import { type As } from "../types";

export interface PageActionsProps<ActionComponent extends As = typeof Button> {
  primaryAction?: ActionProps<ActionComponent>;
  secondaryActions?: Array<ActionProps<ActionComponent>>;
}

export function PageActions<ActionComponent extends As = typeof Button>({
  primaryAction,
  secondaryActions = [],
}: PageActionsProps<ActionComponent>): ReactElement {
  return (
    <div className="mx-auto flex w-full justify-end">
      <ButtonGroup>
        {secondaryActions?.map((action, index) => (
          <Action key={index} {...action} />
        ))}

        {typeof primaryAction !== "undefined" && (
          <Action variant="primary" {...primaryAction} />
        )}
      </ButtonGroup>
    </div>
  );
}
