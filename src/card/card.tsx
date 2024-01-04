import { type HTMLAttributes, type ReactElement } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import { type ActionProps } from "../action";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { type As } from "../types";

export interface CardProps<ActionComponent extends As = typeof Button>
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions?: Array<ActionProps<ActionComponent>>;
}

export function Card<ActionComponent extends As = typeof Button>({
  className,
  title,
  actions = [],
  children,
}: CardProps<ActionComponent>): ReactElement {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-2 sm:rounded-lg bg-surface shadow-sm py-4 border",
        className,
      )}
    >
      {(typeof title !== "undefined" || actions.length > 0) && (
        <div className="flex justify-between px-4">
          <h3 className="text-md font-semibold leading-7">{title}</h3>

          <Dropdown
            activator={
              <Button icon={HiEllipsisHorizontal} size="sm" variant="ghost" />
            }
            sections={[{ items: actions }]}
          />
        </div>
      )}

      <div className="px-4">{children}</div>
    </div>
  );
}
