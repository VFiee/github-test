import React, { useState } from "react";
import { Block, View } from "@tarojs/components";
import Transition from "../index";
import "./index.less";

const TestTransition = () => {
  const [state, setState] = useState(false);
  return (
    <Block>
      <View
        className="toggle-btn"
        onClick={() => {
          setState(!state);
        }}
      >
        toggle
      </View>
      {/* <Transition name="fade" show={state}>
        <View className="fade-item"></View>
      </Transition> */}
      {/* <Transition name="slideUp" show={state}>
        <View className="slideUp-item"></View>
      </Transition> */}
      {/* <Transition name="slideDown" show={state}>
        <View className="slideDown-item"></View>
      </Transition> */}
      {/* <Transition name="slideLeft" show={state}>
        <View className="slideLeft-item"></View>
      </Transition> */}
      <Transition name="slideRight" show={state}>
        <View className="slideRight-item"></View>
      </Transition>
    </Block>
  );
};

export default TestTransition;
