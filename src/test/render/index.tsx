import React, { useState } from "react";
// import _ from "lodash";
import { View } from "@tarojs/components";
// import Blank from "@Components/blank";
// import BottomLine from "@Components/bottomLine";
// import BottomLoading from "@Components/bottomLoading";
// import Carousel from "@Components/carousel";
// import Authorize from "@Components/authorize";
// import EnsureLogin from "@PageComponents/ensureLogin";
import List from "@Components/list";
import { BaseObject } from "@Types/index";
// import Image from "./image";
import "./index.less";

const Test = (props) => {
  const id = props.data.id;
  return (
    <View className="test_extra" onClick={() => console.log(props)}>
      {id}
    </View>
  );
};
const service = (params): Promise<BaseObject> => {
  console.log(params);
  console.log(`has request`);
  const list = new Array(60).fill(0);
  console.log(list.length);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ list });
    }, 2500);
  });
};
// function getPhoneNumber(eve) {
//   console.log(eve);
// }

const TestRender = () => {
  const [params, setParams] = useState({});
  return (
    <View className="wrap">
      {/* <Image />
      <Blank />
      <BottomLine />
      <BottomLoading />
      <Carousel
        data={[{ id: "76408473" }, { id: "76408474" }]}
        swiperPorps={{
          customIndicator: true,
          dotActiveLine: true,
          style: { width: "100%", height: "500rpx" },
          onChange: (eve) => {
            console.log(eve);
          },
        }}
      ></Carousel>
      <Authorize
        isSatisfy={false}
        openType="getPhoneNumber"
        onGetPhoneNumber={getPhoneNumber}
      >
        <View>123123123113</View>
      </Authorize>
      <EnsureLogin>
        <View>必须登录</View>
      </EnsureLogin> */}
      {/* <View onClick={() => setParams({ number: _.random(0, 60) })}>刷新</View> */}
      <List
        scrollY
        refresherEnabled
        Component={Test}
        params={params}
        service={service}
        // style={{ height: "100%" }}
        className="test_scroll_view"
      />
    </View>
  );
};

export default TestRender;
