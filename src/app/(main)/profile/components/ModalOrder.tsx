/* eslint-disable react/display-name */

"use client";

import React, {
  createRef,
  forwardRef,
  useCallback,
  useState,
  useImperativeHandle,
} from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const refModalOrder = createRef();

interface IProps {}

const ModalOrder = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const onRequestClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const show = useCallback(() => {
    setShowModal(true);
  }, []);

  useImperativeHandle(ref, () => {
    return { show };
  });

  return (
    <Modal
      isOpen={showModal}
      style={customStyles}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
    >
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
});

export default ModalOrder;
