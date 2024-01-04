import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { type ActionProps } from "../action";
import { type Button } from "../button";
import { Popover, type PopoverProps } from "../popover";
import { type As } from "../types";

export interface DropdownSectionProps<
  ActionComponent extends As = typeof Button,
> {
  className?: string;
  title?: string;
  items: Array<ActionProps<ActionComponent>>;
}

export interface DropdownProps<ActionComponent extends As = typeof Button>
  extends PopoverProps {
  sections: Array<DropdownSectionProps<ActionComponent>>;
}

export function Dropdown<ActionComponent extends As = typeof Button>({
  className,
  sections,
  ...props
}: DropdownProps<ActionComponent>): ReactElement {
  return (
    <Popover {...props}>
      <div
        className={twMerge(
          "flex flex-col cursor-default divide-y min-w-[8rem]",
          className,
        )}
      >
        {sections.map((section, sectionIndex) => {
          return (
            <div className="p-2" key={sectionIndex}>
              {typeof section.title !== "undefined" && (
                <div className="p-2 text-sm font-semibold">{section.title}</div>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map(
                  ({ content, onAction, ...itemProps }, itemIndex) => {
                    return (
                      <div
                        className="flex h-8 cursor-pointer items-center rounded-md p-2 text-sm hover:bg-gray-100"
                        key={itemIndex}
                        onClick={onAction}
                        {...itemProps}
                      >
                        {content}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Popover>
  );
}
