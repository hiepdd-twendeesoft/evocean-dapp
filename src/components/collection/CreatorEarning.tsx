import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
import Image from 'next/image';

const onFinish = (values: any) => {};

const CreatorEarning = () => {
  return (
    <Card className="mt-[68px] w-[680px] mx-auto rounded-2xl">
      <span className="text-[20px] font-medium leading-5">
        Creator earnings
      </span>
      <div className="mt-[40px] p-[24px] bg-gray-50 rounded-lg mb-[16px]">
        <div className="flex gap-[12px]">
          <Image
            alt="bank-icon"
            width={24}
            height={24}
            src={'/assets/icon/bank-icon.svg'}
          />
          <span className="font-medium text-[16px] leading-6">
            Your contract enforces fees on OpenSea
          </span>
        </div>
        <div className="mt-[8px]">
          <span className="text-[14px] text-gray-500">
            Earn apercentage of the sale price when one of your items is re-sold
            using OpenSea. Adding multiple addresses may increase gas fees for
            buyers. If you set a lower fee on other marketplaces, your fee on
            OpenSea will be updated to match that amount.
          </span>
          <span className="text-blue-500 ml-1">Learn more</span>
        </div>
      </div>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'first']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                  >
                    <Input size="large" placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'last']}
                    rules={[{ required: true, message: 'Missing last name' }]}
                  >
                    <Input size="large" placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatorEarning;
