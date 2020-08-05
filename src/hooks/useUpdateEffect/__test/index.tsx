import React from "react";
import { View, Block, Button } from "@tarojs/components";
import { useUpdateEffect, useUpdate } from "@Hooks/index";

const Demo = () => {
  const update = useUpdate();
  useUpdateEffect(() => {
    console.log("update?");
  });
  return (
    <Block>
      <View>{Date.now()}</View>
      <Button onClick={update}>更新</Button>
    </Block>
  );
};

export default Demo;
