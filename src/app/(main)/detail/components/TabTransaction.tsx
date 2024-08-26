import { TransactionTheme } from '@/models/common.type';
import { shortenAddress } from '@/utils/helper';
import { lamportsToSol } from '@/utils/lamports-to-sol';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { FC, Fragment } from 'react';

interface IProps {
  Transactions?: TransactionTheme[];
}

const TabTransaction: FC<IProps> = ({ Transactions }) => {
  return (
    <Fragment>
      <h3 className="text-lg font-medium text-gray-900">
        Transaction of this product
      </h3>
      <p className="text-base font-normal text-gray-600">
        Every transaction associated with this product is securely recorded and
        stored within the blockchain, ensuring a transparent and unalterable
        history of all exchanges and activities.
      </p>
      <div className="w-full xl:mb-0 mt-12">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full">
              <thead>
                <tr className="border-b-[1px] border-b-gray-200">
                  <th className="px-6 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Signature
                  </th>
                  <th className="px-6 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Time
                  </th>
                  <th className="px-6 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Type
                  </th>
                  <th className="px-6 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    From
                  </th>

                  <th className="px-6 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    To
                  </th>
                  <th className="px-6 text-gray-900 text-sm font-semibold align-middle py-3 whitespace-nowrap text-left">
                    Account
                  </th>
                </tr>
              </thead>

              <tbody>
                {!isEmpty(Transactions) &&
                  Transactions?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b-[1px] border-b-gray-200"
                    >
                      <th className="border-t-0 px-6 py-4 align-middle text-sm font-medium whitespace-nowrap text-left text-gray-900">
                        {shortenAddress(item.buyer)}
                      </th>
                      <td className="border-t-0 px-6 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap ">
                        {shortenAddress(item.seller)}
                      </td>
                      <td className="border-t-0 px-6 py-4 align-center text-[14px] text-gray-500 whitespace-nowrap">
                        {lamportsToSol(item.price)} SOL
                      </td>
                      <td className="border-t-0 px-6 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                        {item.kind}
                      </td>
                      <td className="border-t-0 px-6 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                        {moment(item.date).fromNow()}
                      </td>
                      <td className="border-t-0 px-6 py-4 align-middle text-[14px] text-gray-500 whitespace-nowrap">
                        {item.theme_id}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isEmpty(Transactions) && (
              <div className="mt-10">
                <Empty className="m-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TabTransaction;
