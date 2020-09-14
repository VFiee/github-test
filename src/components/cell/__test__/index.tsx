import React from "react";
import { View } from "@tarojs/components";
import { Cell, CellGroup } from "@Components/index";
import "./index.less";

const TestCell = () => {
  return (
    <React.Fragment>
      {/* 默认情况 */}
      <CellGroup>
        <Cell
          arrow
          center
          title="电话"
          value="默认"
          label="描述信息"
          icon="icon-home1"
        />
      </CellGroup>
      {/* 去除边框 */}
      <CellGroup border={false}>
        <Cell required value="默认" />
      </CellGroup>
      {/* 设置分组 */}
      <CellGroup title="分组1">
        <Cell value="默认" />
      </CellGroup>
      {/* 自定义分组标题 */}
      <CellGroup title={<View className="custom-title">我是自定义标题</View>}>
        <Cell value="默认" />
      </CellGroup>
    </React.Fragment>
  );
};

export default TestCell;
