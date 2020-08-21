import React from "react";
import { Picker } from "@tarojs/components";
import { PickerDateProps } from "@tarojs/components/types/Picker";

export interface DateSelectorProps extends PickerDateProps {}

const Component = (props) => {
  const { placeholder, ...pickerProps } = props;
  return <Picker {...pickerProps}>{placeholder}</Picker>;
};

export default Component;
