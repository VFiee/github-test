import React from "react";
import { View } from "@tarojs/components";
import TRender from "@TRender";
// import THook from "@THook";
import NavigationBar from "@Components/navigationBar";
import "./index.less";

function Index() {
  return (
    <React.Fragment>
      <NavigationBar
        left={{
          onClick: (eve) => {
            console.log(eve);
          },
        }}
        right={{
          onClick: (...args) => {
            console.log(args);
          },
        }}
        backgroundColor="#00ab84"
      />
      <View className="index">
        <TRender />
        {/* <THook /> */}
      </View>
    </React.Fragment>
  );
}

export default Index;
