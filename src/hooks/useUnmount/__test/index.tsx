import React from "react";
import { View } from "@tarojs/components";
import useUnmount from "../index";

const useUnmountDemo = () => {
  useUnmount([
    () => {
      console.log(`component isUnmount!!! one`);
    },
    () => {
      console.log(`component isUnmount!!! two`);
    },
  ]);
  return <View>unmount Demo</View>;
};

export default useUnmountDemo;
