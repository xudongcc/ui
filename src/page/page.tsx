import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { type PropsWithChildren, type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../action";
import { type Button } from "../button";
import { ButtonGroup } from "../button-group";
import { type As } from "../types";

export interface PageHeaderProps<Component extends As = typeof Button> {
  title?: string;
  backAction?: Pick<ActionProps<Component>, "onAction">;
  primaryAction?: ActionProps<Component>;
  secondaryActions?: Array<ActionProps<Component>>;
}

export function PageHeader<Component extends As = typeof Button>({
  title,
  backAction,
  primaryAction,
  secondaryActions = [],
}: PageHeaderProps<Component>): ReactElement {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      {typeof backAction !== "undefined" && (
        <Action icon={ArrowUturnLeftIcon} variant="ghost" {...backAction} />
      )}

      {typeof title !== "undefined" && (
        <h2 className="flex-1 text-xl font-bold text-gray-900">{title}</h2>
      )}

      <ButtonGroup>
        {secondaryActions.map((action, index) => (
          <Action key={index} {...action} />
        ))}

        {typeof primaryAction !== "undefined" && (
          <Action variant="primary" {...primaryAction} />
        )}
      </ButtonGroup>
    </div>
  );
}

export interface PageProps<Component extends As = typeof Button>
  extends PageHeaderProps<Component> {
  fullWidth?: boolean;
}

export function Page<Component extends As = typeof Button>({
  title,
  fullWidth = false,
  children,
  backAction,
  primaryAction,
  secondaryActions,
}: PropsWithChildren<PageProps<Component>>): ReactElement {
  return (
    <div className={twMerge(`p-4 mx-auto`, !fullWidth && `max-w-5xl`)}>
      <PageHeader<Component>
        backAction={backAction}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        title={title}
      />

      <div>{children}</div>
    </div>
  );
}
