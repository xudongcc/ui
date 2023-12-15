import { HiEllipsisHorizontal } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Dropdown } from "../Dropdown";
import { forwardRef } from "../utils";

export interface CardProps {
  title?: string;
  actions?: ActionProps[];
}

export const Card = forwardRef<CardProps, "div">(
  ({ className, title, actions = [], children }, ref) => {
    return (
      <div
        className={twMerge(
          "flex flex-col gap-2 sm:rounded-lg bg-surface shadow-sm py-4 border",
          className,
        )}
        ref={ref}
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
  },
);
