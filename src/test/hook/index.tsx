import React, { useState } from "react";
import { Button, Block, View } from "@tarojs/components";
import UseUpdate from "@Hooks/useUpdate/__test";
import UseMount from "@Hooks/useMount/__test";
import UseUnmount from "@Hooks/useUnmount/__test";
import UseUpdateEffect from "@Hooks/useUpdateEffect/__test";
import UseWhyUpdate from "@Hooks/useWhyUpdate/__test";

import "./index.less";

const Line = (props) => {
  const { text, Component, extra = null, ...args } = props;
  return (
    <Block>
      {text}
      <Component {...args} />
      {extra}
      <View className="line"></View>
    </Block>
  );
};

const THook = () => {
  const [show, toggleShow] = useState(true);
  const [data, setProps] = useState({});
  return (
    <React.Fragment>
      <Line text="UseUpdate:" Component={UseUpdate} />
      <Line text="UseMount:" Component={UseMount} />
      {!!show && (
        <Line
          text="UseUnmount:"
          Component={UseUnmount}
          extra={
            <Button
              onClick={() => {
                toggleShow(!show);
              }}
            >
              {show ? "unmount" : "mount"}
            </Button>
          }
        />
      )}
      <Line text="UseUpdateEffect:" Component={UseUpdateEffect} />
      <Line
        text="UseWhyUpdate:"
        Component={UseWhyUpdate}
        extra={
          <Button
            onClick={() => {
              let count = data["count"] || 0;
              setProps({
                count: count += 1,
              });
            }}
          >
            change props
          </Button>
        }
        data={data}
      />
    </React.Fragment>
  );
};

export default THook;
