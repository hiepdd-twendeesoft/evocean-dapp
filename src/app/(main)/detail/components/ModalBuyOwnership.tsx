/* eslint-disable react/display-name */
"use client";

import {
  Fragment,
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import Modal from "react-modal";
import "../detail.style.css";

export const refModalBuyOwnership = createRef<any>();

export const modalBuyOwnershipControl = {
  show: () => refModalBuyOwnership.current?.show(),
  close: () => refModalBuyOwnership.current?.close(),
};

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    borderRadius: 12,
    padding: 32,
  },
  overlay: {
    zIndex: "inherit",
  },
};

const ModalBuyOwnership = forwardRef((_, ref) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  // const priceDollar = useConvertDollar(1);

  const show = useCallback(() => {
    setShowModal(true);
  }, []);
  const close = useCallback(() => {
    setShowModal(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
      close,
    };
  });

  const handleApproved = useCallback(() => {
    setStep(1);
  }, []);

  return (
    <Modal isOpen={showModal} style={customStyles} ariaHideApp={false}>
      <div className="bg-white">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">
            Buy ownership
          </h3>
          <button onClick={close}>
            <img
              src="/assets/icon/close-icon.svg"
              alt="close"
              className="w-[38px]"
            />
          </button>
        </div>
        <div className="flex items-start mt-6 border-b-gray-200 border-b-[1px] pb-8 mb-8">
          <img
            src={"/assets/image/theme.png"}
            alt="theme"
            className="w-[126px] rounded-[12px]"
          />
          <div className="ml-4 w-full">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Nimbus - Multi-Layout AI-Powerd SaaS Template
            </h3>
            <div className="flex items-center flex-wrap">
              <div className="h-[32px] rounded-[16px] bg-indigo-50 items-center justify-center flex mr-4 px-4">
                <p className="text-sm font-medium text-indigo-800">UI Kit</p>
              </div>
              <div className="h-[32px] rounded-[16px] bg-indigo-50 items-center justify-center flex px-4">
                <p className="text-sm font-medium text-indigo-800">
                  Framer template
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-end flex-col">
            <p className="text-base font-medium text-gray-900">222.22</p>
            <p className="text-sm font-medium text-gray-500">$1200</p>
          </div>
        </div>
        {step === 0 && (
          <Fragment>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Total price</h3>
              <h3 className="text-lg font-medium text-gray-900">22.344 SOL</h3>
            </div>
            <button
              onClick={handleApproved}
              className="h-[50px] w-full rounded-[12px] bg-indigo-600 flex items-center justify-center mt-6"
            >
              <p className="text-white font-semibold text-base">
                Buy ownership
              </p>
            </button>
          </Fragment>
        )}
        {step === 1 && (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-gray-900 font-medium mb-1">
                Go to your wallet
              </h3>
              <p className="text-base font-normal text-gray-600">
                You will be asked to approve this purchase from your wallet.
              </p>
            </div>
            <div className="loading-icon">
              <div className="spinner"></div>
            </div>
          </div>
        )}
        {step === 2 && (
          <Fragment>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Total price</h3>
              <h3 className="text-lg font-medium text-gray-900">22.344 SOL</h3>
            </div>
            <button
              onClick={handleApproved}
              className="h-[50px] w-full rounded-[12px] bg-indigo-600 flex items-center justify-center mt-6"
            >
              <p className="text-white font-semibold text-base">
                View your ownership
              </p>
            </button>
          </Fragment>
        )}
      </div>
    </Modal>
  );
});

export default ModalBuyOwnership;
