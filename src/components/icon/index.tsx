import React from "react";
import { View } from "@tarojs/components";
import "./index.less";

const Icon = (props) => {
  console.log(props);
  return <View className="__icon__">icon</View>;
};
Icon.options = {
  addGlobalClass: true,
};
export default Icon;
