import React from "react";
import ErrorIcon from "@Images/error.png";
import Empty from "../index";
import "./index.less";

const Test = () => {
  return (
    <React.Fragment>
      <Empty />
      <Empty description="带有子组件的Empty">我就是子组件哦</Empty>
      <Empty image={ErrorIcon} description="自定义图片">
        自定义图片
      </Empty>
    </React.Fragment>
  );
};

export default Test;
