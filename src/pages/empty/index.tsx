import React from "react";
import ErrorIcon from "@Images/error.png";
import { Empty } from "@Components/index";
import "./index.less";

const Test = () => {
  return (
    <React.Fragment>
      <Empty />
      <Empty description="带有子组件的Empty">我就是子组件哦</Empty>
      <Empty image="error" description="发生错误">
        发生了错误
      </Empty>
      <Empty image="network" description="网络错误">
        网络发生错误
      </Empty>
      <Empty
        image={{
          type: ErrorIcon,
          style: {
            fontSize: "160rpx",
          },
        }}
        description="网络错误"
      >
        自定义
      </Empty>
    </React.Fragment>
  );
};

export default Test;
