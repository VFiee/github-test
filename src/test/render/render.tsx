import React from "react";
import { Block, View } from "@tarojs/components";
// import Divider from "@Components/divider/__test__";
// import Empty from "@Components/empty/__test__";
// import Loading from "@Components/loading/__test__";
// import Icon from "@Components/icon/__test__";
// import Image from "@Components/image/__test__";
import "./index.less";

const Border = () => {
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

const Ellipsis = () => {
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

const Component = () => {
  return (
    <Block>
      {/* <Divider /> */}
      {/* <Empty /> */}
      {/* <Loading /> */}
      {/* <Icon /> */}
      {/* <Image /> */}
      <Border />
      <Ellipsis />
    </Block>
  );
};

export default Component;
