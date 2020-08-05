import React from "react";
import { View, Block, Button } from "@tarojs/components";
import useUpdate from "../index";

const Demo = () => {
  const update = useUpdate();
  return (
    <Block>
      <View>{Date.now()}</View>
      <Button onClick={update}>更新</Button>
    </Block>
  );
};

export default Demo;
