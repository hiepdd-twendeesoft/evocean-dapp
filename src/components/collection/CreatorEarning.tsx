import useFetchUser from '@/hooks/useFetchUser';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, InputNumber, Select, Space } from 'antd';
import { uniqBy } from 'lodash';
import Image from 'next/image';

export interface IEarning {
  percentage: number;
  userId: number;
}

interface ICreatorEarningProps {
  handleSaveEarning: (v: { earnings: IEarning[] }) => void;
  form: any;
}

const CreatorEarning = ({ handleSaveEarning, form }: ICreatorEarningProps) => {
  const initField = {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0
  };
  const { data: userList } = useFetchUser();

  const validateTotalPercentage = () => {
    const earnings = form.getFieldValue('earnings') || [];
    const total = earnings.reduce(
      (sum: number, current: any) => sum + (current?.percentage || 0),
      0
    );
    if (total > 100) {
      return Promise.reject(new Error('Total percentage cannot exceed 100%'));
    }
    return Promise.resolve();
  };

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
            Earn a percentage of the sale price when one of your items is
            re-sold using OpenSea. Adding multiple addresses may increase gas
            fees for buyers. If you set a lower fee on other marketplaces, your
            fee on OpenSea will be updated to match that amount.
          </span>
          <span className="text-blue-500 ml-1">Learn more</span>
        </div>
      </div>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={handleSaveEarning}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.List name="earnings">
          {(fields, { add, remove }) => {
            return (
              <>
                {uniqBy([initField, ...fields], 'key').map(
                  ({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        alignItems: 'center'
                      }}
                    >
                      <Form.Item
                        className="flex-1"
                        {...restField}
                        name={[name, 'userId']}
                      >
                        <Select
                          showSearch
                          size={'large'}
                          placeholder="you@example.com"
                          style={{ width: 400 }}
                          optionFilterProp="label"
                          options={userList?.map(item => ({
                            label: item.email,
                            value: item.id
                          }))}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'percentage']}
                        rules={[
                          {
                            required: false,
                            validator: validateTotalPercentage
                          }
                        ]}
                      >
                        <InputNumber max={100} size="large" suffix="%" />
                      </Form.Item>
                      <Form.Item>
                        <Image
                          onClick={() => remove(name)}
                          alt="icon"
                          width={24}
                          height={24}
                          src={'/assets/icon/trash.svg'}
                          className="cursor-pointer"
                        />
                      </Form.Item>
                    </Space>
                  )
                )}
                <Form.Item>
                  <Button
                    type="text"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    className="text-blue-500"
                  >
                    Add earnings payout address and percentage
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Card>
  );
};

export default CreatorEarning;
