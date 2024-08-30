import { Spin } from 'antd';

function Loading() {
  return (
    <div
      className={`top-0 left-0 right-0 bottom-0 bg-transparent flex fixed items-center justify-center z-50`}
    >
      <Spin className="text-primary" />
    </div>
  );
}

export default Loading;
