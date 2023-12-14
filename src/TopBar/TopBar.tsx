import { Bars3Icon } from "@heroicons/react/24/outline";
import { type FC, type ReactElement } from "react";

import { Button } from "../Button";

export interface TopBarProps {
  userMenu?: ReactElement;
  showNavigationToggle?: boolean;
  onNavigationToggle?: () => void;
}

export const TopBar: FC<TopBarProps> = ({
  userMenu,
  showNavigationToggle = false,
  onNavigationToggle,
}) => {
  return (
    <div className="grid h-14 grid-cols-[1fr_minmax(auto,30rem)_1fr] items-center gap-1 border-b bg-surface px-4">
      <div className="flex justify-start">
        {showNavigationToggle && (
          <Button
            className="block md:hidden"
            icon={Bars3Icon}
            variant="ghost"
            onClick={onNavigationToggle}
          />
        )}
      </div>
      <div className="flex justify-center"> </div>
      <div className="flex justify-end">{userMenu}</div>
    </div>
  );
};
