import { type FC, type PropsWithChildren, useContext, useState } from "react";

import { Modal } from "./modal";
import { type ModalProps } from "./modal";
import { ModalContext } from "./modal-context";

export const ModalManager: FC = () => {
  const context = useContext(ModalContext);

  return (
    <Modal
      open={false}
      primaryAction={{}}
      onClose={() => {}}
      {...context?.modalProps}
    >
      {context?.modalProps?.children}
    </Modal>
  );
};

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalProps, setModalProps] = useState<ModalProps>();

  return (
    <ModalContext.Provider value={{ modalProps, setModalProps }}>
      {children}
      <ModalManager />
    </ModalContext.Provider>
  );
};
