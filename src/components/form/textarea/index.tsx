import React from "react";
import { Textarea } from "@tarojs/components";
import { TextareaProps } from "@tarojs/components/types/Textarea.d";
import { BaseField } from "../fieldItem";
import "../index.less";

interface InternalTextareaProps extends TextareaProps, BaseField {}

const Component = (props: InternalTextareaProps) => {
  const {
    fieldValue,
    fieldChange,
    maxlength = -1,
    autoHeight = true,
    placeholderClass = "",
    disableDefaultPadding = true,
    onInput,
    ...textareaProps
  } = props;
  return (
    <Textarea
      {...textareaProps}
      value={fieldValue || ""}
      onInput={(eve) => {
        onInput && onInput(eve);
        fieldChange(eve.detail.value);
      }}
      maxlength={maxlength}
      autoHeight={autoHeight}
      disableDefaultPadding={disableDefaultPadding}
      placeholderClass={`__textarea_placeholder__ ${placeholderClass}`}
      className={`__textarea__ ${textareaProps?.className || ""}`}
    />
  );
};
export { TextareaProps };
export default Component;
