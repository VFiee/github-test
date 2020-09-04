import React, { useState } from "react";
import { Block, View } from "@tarojs/components";
import Transition, { TransitionType } from "../index";
import "./index.less";

const TestTransition = () => {
  const [type, setType] = useState("fade");
  const [state, setState] = useState({ show: false, type: "fade" });
  return (
    <Block>
      <View
        onClick={() => {
          setType(type === "fade" ? "slide" : "fade");
        }}
      >
        切换类型:{type}
      </View>
      <View
        className="toggle-btn"
        onClick={() => {
          setState({
            show: !state.show,
            type: "fade",
          });
        }}
      >
        fade
      </View>
      <View
        className="toggle-btn"
        onClick={() => {
          setState({
            show: !state.show,
            type: `${type}Up`,
          });
        }}
      >
        {`${type}Up`}
      </View>
      <View
        className="toggle-btn"
        onClick={() => {
          setState({
            show: !state.show,
            type: `${type}Down`,
          });
        }}
      >
        {`${type}Down`}
      </View>
      <View
        className="toggle-btn"
        onClick={() => {
          setState({
            show: !state.show,
            type: `${type}Left`,
          });
        }}
      >
        {`${type}Left`}
      </View>
      <View
        className="toggle-btn"
        onClick={() => {
          setState({
            show: !state.show,
            type: `${type}Right`,
          });
        }}
      >
        {`${type}Right`}
      </View>
      <Transition name={state.type as TransitionType} show={state.show}>
        <View className={`${state.type}-item`}></View>
      </Transition>
    </Block>
  );
};

export default TestTransition;
