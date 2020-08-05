import React from "react";
import { View } from "@tarojs/components";
import Blank from "@Components/blank";
import BottomLine from "@Components/bottomLine";
import BottomLoading from "@Components/bottomLoading";
import Carousel from "@Components/carousel";
import Image from "./image";
import "./index.less";

const test = (props) => {
  console.log(props);
  return <View className="test_extra">hahahahahahah</View>;
};

const testRender = () => {
  return (
    <React.Fragment>
      <Image />
      <Blank />
      <BottomLine />
      <BottomLoading />
      <Carousel
        data={[{ id: "76408473" }, { id: "76408474" }]}
        swiperPorps={{
          customIndicator: true,
          dotActiveLine: true,
          style: { width: "100%", height: "500rpx" },
        }}
      ></Carousel>
    </React.Fragment>
  );
};

export default testRender;
