import { Block, View } from "@tarojs/components";
import React from "react";
import Image from "../index";
import "./index.less";

const TestImage = () => {
  return (
    <Block>
      <View className="align-center">
        <Image src="https://file.zhen22.com/weapp/default-news.png" />
      </View>
      <View className="align-center">
        <Image round src="https://file.zhen22.com/weapp/default-news.png" />
      </View>
      <View className="align-center">
        <Image
          radius="20rpx"
          src="https://file.zhen22.com/weapp/default-news.png"
        />
      </View>
      <View className="align-center">
        <Image
          width="100%"
          height="500rpx"
          radius="20rpx"
          src="https://pic.netbian.com/uploads/allimg/190824/212516-15666531161ade.jpg"
        />
      </View>
    </Block>
  );
};
export default TestImage;
