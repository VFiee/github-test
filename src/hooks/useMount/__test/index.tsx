import React from "react";
import { View } from "@tarojs/components";
import useMount from "../index";

const useMountDemo = () => {
  useMount(() => {
    console.log(`component isMount!!!`);
  });
  return <View>Mount Demo</View>;
};

export default useMountDemo;
