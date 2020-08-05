import React from "react";
import { View } from "@tarojs/components";
import { useWhyUpdate } from "@Hooks/index";
import { cProps } from "@Hooks/useWhyUpdate";

const Demo = (props: cProps) => {
  useWhyUpdate("WhyUpdateDemo", props);
  return <View>WhyUpdateDemo</View>;
};

export default Demo;
