import React, { useState } from "react";
import { Block, View } from "@tarojs/components";
import "./index.less";

export const Border = () => {
  return (
    <Block>
      <View className="border-item border-top">上边框</View>
      <View className="border-item border-right">右边框</View>
      <View className="border-item border-bottom">下边框</View>
      <View className="border-item border-left">左边框</View>
      <View className="border-item border-all">全边框</View>
      <View
        className="border-item border-all"
        style={{ borderRadius: "10rpx" }}
      >
        圆角
      </View>
    </Block>
  );
};

export const Ellipsis = () => {
  return (
    <Block>
      <View className="ellipsis-item ellipsis">
        单行文字隐藏单行文字隐藏单行文字隐藏单行文字隐藏单行文字隐藏单行文字隐藏
      </View>
      <View className="ellipsis-item ellipsis-l2">
        两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏两行文字隐藏
      </View>
      <View className="ellipsis-item ellipsis-l3">
        三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏三行文字隐藏
      </View>
    </Block>
  );
};

export const Transition = () => {
  const [state, setState] = useState("");
  const setClass = (cls) => {
    console.log(cls);
    setState(cls);
    setTimeout(() => {
      setState("");
    }, 2000);
  };
  return (
    <Block>
      <View
        className="transition-item"
        onClick={() => setClass("animate__fadeIn")}
      >
        Slide
      </View>
      <View className={`transition-target ${state}`}></View>
    </Block>
  );
};
