import { getImageUrl } from "@/util";
import React from "react";
import Icon from "../index";

const IconTest = () => {
  return (
    <React.Fragment>
      <Icon type="icon-camera">照相机</Icon>
      <Icon type="icon-morentu">默认图</Icon>
      <Icon type="icon-bluetoothon">蓝牙</Icon>
      <Icon
        type={getImageUrl("lunbo")}
        style={{ width: "100vw", height: "500rpx" }}
      />
      <Icon type="icon-error_img" />
    </React.Fragment>
  );
};

export default IconTest;
