import React from "react";
import { Picker } from "@tarojs/components";
import {
  PickerDateProps,
  PickerMultiSelectorProps,
  PickerRegionProps,
  PickerSelectorProps,
  PickerTimeProps,
} from "@tarojs/components/types/Picker";
import "../index.less";

export type PickerProps =
  | PickerSelectorProps
  | PickerMultiSelectorProps
  | PickerDateProps
  | PickerTimeProps
  | PickerRegionProps;

const Component = (props: PickerProps) => {
  const { ...pickerProps } = props;
  return (
    <Picker
      {...pickerProps}
      className={`__picker__ ${pickerProps?.className || ""}`}
    >
      请选择国家
    </Picker>
  );
};

export default Component;
