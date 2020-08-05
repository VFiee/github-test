import React from "react";
import { View, Text } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import "./index.less";

export interface ExtendsViewProps extends ViewProps {
  text?: string;
}

const default_text = `买房要省钱,就找真二网`;
const BottomLine = (props: ExtendsViewProps) => {
  const { className = "", text = "", ...restProps } = props;
  return (
    <View className={`line-wrap ${className}`} {...restProps}>
      <Text className="line-text">{text || default_text}</Text>
    </View>
  );
};

export default BottomLine;
