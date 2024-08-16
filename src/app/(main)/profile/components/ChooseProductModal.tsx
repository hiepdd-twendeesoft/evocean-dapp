import { Button, Modal } from 'antd';
import React from 'react';

export default function ChooseProductModal() {
  return (
    <Modal centered open={true} width={1000}>
      <div className="flex justify-between">
        <h2 className="text-[30px] font-bold ">Your products</h2>
        <Button>Select all</Button>
      </div>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
