import React from "react";
import { Picker } from "@tarojs/components";
import { PickerTimeProps } from "@tarojs/components/types/Picker";

export interface TimeSelectorProps extends PickerTimeProps {}

const Component = (props) => {
  const { placeholder, ...pickerProps } = props;
  return <Picker {...pickerProps}>{placeholder}</Picker>;
};

export default Component;
