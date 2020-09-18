import React from "react";
import { View, Text } from "@tarojs/components";
import { Cell, CellGroup } from "@Components/index";
import "./index.less";

const TestCell = () => {
  return (
    <View className="wrap">
      <CellGroup title="基础用法">
        <Cell title="默认情况" value="value是必填的" />
        <Cell
          title="很长的描述信息很长的描述信息哦"
          label="我是描述信息"
          value="value是必填的"
        />
        <Cell
          center
          title="添加描述信息,内容居中"
          label="我是描述信息"
          value="value是必填的"
        />
        <Cell center required title="必填" value="value是必填的" />
      </CellGroup>

      <CellGroup title="自定义Icon">
        <Cell title="展示箭头" arrow value="value是必填的" />
        <Cell
          arrow
          title="展示箭头,改变箭头方向"
          arrowDirection="down"
          value="value是必填的"
        />
        <Cell
          required
          icon="icon-home"
          title="自定义左边Icon"
          value="value是必填的"
        />
        <Cell
          rightIcon="icon-home"
          title="自定义右边Icon"
          value="value是必填的"
        />
        <Cell
          icon="icon-home"
          rightIcon="icon-caidan"
          title="左右边都是Icon"
          value="value是必填的"
        />
        <Cell
          title="自定义Icon元素"
          value="value必填"
          icon={<View>[icon]</View>}
          rightIcon={<View>[icon]</View>}
        />
      </CellGroup>

      <CellGroup title="去除默认样式">
        <Cell title="必填项" required value="默认" />
        <Cell title="去除border" border={false} required value="默认" />
      </CellGroup>
      {/* 自定义分组标题 */}
      <CellGroup title="自定义标题">
        <Cell
          center
          colon
          value="默认"
          title={<Text className="custom-title">我是自定义标题</Text>}
        />
      </CellGroup>
    </View>
  );
};

export default TestCell;
