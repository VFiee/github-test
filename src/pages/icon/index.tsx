import React from "react";
import { Icon } from "@Components/index";
import { getImageUrl } from "@Util/index";

const IconTest = () => {
  return (
    <React.Fragment>
      <Icon type="icon-home">首页</Icon>
      <Icon type="icon-morentu">默认图</Icon>
      <Icon type="icon-left">返回</Icon>
      <Icon
        type={getImageUrl("lunbo")}
        style={{ width: "100vw", height: "500rpx" }}
      />
      <Icon type="icon-error_img" />
    </React.Fragment>
  );
};

export default IconTest;
