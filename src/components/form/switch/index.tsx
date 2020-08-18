import React from "react";
import { Switch } from "@tarojs/components";
import { SwitchProps } from "@tarojs/components/types/Switch.d";
import { BaseField } from "../field";
import "../index.less";

interface InternalSwitchProps extends SwitchProps, BaseField {}

const Component = (props: InternalSwitchProps) => {
  const { fieldChange, fieldValue, onChange, ...switchProps } = props;
  return (
    <Switch
      {...switchProps}
      checked={fieldValue === undefined ? !!switchProps?.checked : !!fieldValue}
      onChange={(eve) => fieldChange(eve.detail.value)}
      className={`__switch__ ${switchProps?.className || ""}`}
    />
  );
};
export { SwitchProps };
export default Component;
