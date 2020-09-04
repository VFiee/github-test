import React, { useState } from "react";
import { Block, View } from "@tarojs/components";
import Overlay from "../index";
import "./index.less";

const TestOverlay = () => {
  const [show, setState] = useState(false);
  console.log(`state:`, show);

  return (
    <Block>
      <View className="toggle" onClick={() => setState(!show)}>
        {show ? "隐藏" : "显示"}
      </View>
      <Overlay
        show={show}
        customAppbar
        onClick={() => {
          setState(false);
        }}
      >
        <View
          onClick={(eve) => {
            eve.stopPropagation();
            console.log(1231312312);
          }}
        >
          123123123
        </View>
      </Overlay>
    </Block>
  );
};

export default TestOverlay;
