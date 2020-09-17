import React from "react";
import { View } from "@tarojs/components";
import { Field } from "@Components/index";
import "./index.less";

const Test = () => {
  return (
    <View className="wrap">
      <Field
        showError
        value="123"
        errorMsg="您输入的格式有误"
        // type="te"
        label="文本"
        placeholder="请输入文本"
        clear
      />
      <Field
        label="用户名"
        value="vyron"
        placeholder="请输入用户名"
        clear
        clearTrigger="always"
        // onInput={(eve) => {
        //   // setValue(eve.detail.value);
        //   return "test";
        // }}
      />
      <Field
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
      />
    </View>
  );
};

export default Test;
