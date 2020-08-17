import React from "react";
import { Input } from "@tarojs/components";
import { InputProps } from "@tarojs/components/types/Input";

interface InternalInputProps extends InputProps {
  onChange: (args: any) => void;
}

const Component = (props: InternalInputProps) => {
  const { onChange, ...restProps } = props;
  return (
    <Input {...restProps} onInput={(eve) => onChange?.(eve.detail.value)} />
  );
};

export { InternalInputProps as InputProps };

export default Component;
