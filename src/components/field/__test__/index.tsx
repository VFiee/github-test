import React from "react";
import { View } from "@tarojs/components";
import { Field } from "@Components/index";
import "./index.less";

const Test = () => {
  return (
    <View className="wrap">
      <Field
        clear
        showError
        value="123"
        errorMsg=""
        label="文本"
        placeholder="请输入文本"
      />
      <Field
        clear
        readonly
        label="用户名"
        value="vyron"
        placeholder="请输入用户名"
        onInput={(eve) => {
          console.log(`onInput:`, eve);
          return "test";
        }}
      />
      <Field
        readonly
        leftIcon="icon-home"
        label="备注"
        type="textarea"
        placeholder="请输入备注信息"
        showWordLimit
        maxlength={300}
        required
        clear
        autoHeight
        clearTrigger="always"
        value="12312312312"
        onFocus={(eve) => {
          console.log(`onFocus:`, eve);
        }}
        onBlur={(eve) => {
          console.log(`onBlur:`, eve);
        }}
        onClear={(eve) => {
          console.log(`onClear:`, eve);
        }}
      ></Field>
    </View>
  );
};

export default Test;
