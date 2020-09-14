import React from "react";
import { Input } from "@tarojs/components";
import { InputProps } from "@tarojs/components/types/Input.d";
import { BaseField } from "../fieldItem";

interface InternalInputProps extends InputProps, BaseField {}

const Component = (props: InternalInputProps) => {
  const { fieldChange, fieldValue, value, ...restProps } = props;
  return (
    <Input
      {...restProps}
      value={fieldValue || value || ""}
      onInput={(eve) => fieldChange(eve.detail.value)}
    />
  );
};

export { InputProps };

export default Component;
