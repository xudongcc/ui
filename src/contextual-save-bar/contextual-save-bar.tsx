import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../action";
import { type Button } from "../button";
import { ButtonGroup } from "../button-group";
import { type As } from "../types";

export interface ContextualSaveBarProps<
  ActionComponent extends As = typeof Button,
> {
  alignContentFlush?: boolean;
  message?: string;
  saveAction: ActionProps<ActionComponent>;
  discardAction?: ActionProps<ActionComponent>;
  fullWidth?: boolean;
}

export function ContextualSaveBar<ActionComponent extends As = typeof Button>({
  alignContentFlush = false,
  message,
  saveAction,
  discardAction,
  fullWidth = false,
}: ContextualSaveBarProps<ActionComponent>): ReactElement {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full bg-black">
      {!alignContentFlush && <div className="w-60" />}

      <div
        className={twMerge(
          `flex h-14 items-center justify-end px-4 mx-auto flex-1`,
          !fullWidth && `max-w-5xl`,
          typeof message !== "undefined" && `justify-between`,
        )}
      >
        {typeof message !== "undefined" && (
          <h2 className="text-gray-50">{message}</h2>
        )}

        <ButtonGroup>
          {discardAction != null && <Action {...discardAction} />}
          <Action variant="primary" {...saveAction} />
        </ButtonGroup>
      </div>
    </div>
  );
}
