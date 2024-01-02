import { type FC, type PropsWithChildren, useContext, useState } from "react";

import { Toast, type ToastProps } from "./toast";
import { ToastContext } from "./toast-context";

const ToastManager: FC = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    return null;
  }

  const { toasts } = context;

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-120 flex transform flex-col items-center gap-5 pb-5">
      {toasts.map((toastProps) => {
        return <Toast key={toastProps.id} {...toastProps} />;
      })}
    </div>
  );
};

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
};
