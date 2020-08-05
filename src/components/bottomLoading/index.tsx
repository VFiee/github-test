import React from "react";
import { View } from "@tarojs/components";
import { ExtendsViewProps } from "../bottomLine";
import "./index.less";

const default_loading_text = "正在加载...";
const BottomLoading = (props: ExtendsViewProps) => {
  const { text, className = "", ...restProps } = props;
  return (
    <View className={`_bottom_loading ${className}`} {...restProps}>
      {text || default_loading_text}
    </View>
  );
};

export default BottomLoading;
