import React from "react";
import { Input, Textarea } from "@tarojs/components";
import { InputProps as _InputProps } from "@tarojs/components/types/input";
import { CommonEventFunction } from "@tarojs/components/types";
import { TextareaProps } from "@tarojs/components/types/Textarea";

export interface InputProps extends _InputProps {
  isTextarea?: boolean;
  // Textarea
  fixed?: boolean;
  autoHeight?: boolean;
  showConfirmBar?: boolean;
  disableDefaultPadding?: boolean;
  onLineChange?: CommonEventFunction<TextareaProps.onLineChangeEventDetail>;
}

const BaseInput = (props: InputProps) => {
  const { isTextarea, ...rest } = props;
  console.log(props);

  const Component = isTextarea ? Textarea : Input;
  console.log(`rest.value:`, rest.value);

  return <Component {...rest} />;
};

export default BaseInput;
