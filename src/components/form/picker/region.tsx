import React from "react";
import { Picker } from "@tarojs/components";
import { PickerRegionProps } from "@tarojs/components/types/Picker";

export interface RegionSelectorProps extends PickerRegionProps {}

const Component = (props) => {
  const { placeholder, ...pickerProps } = props;
  return <Picker {...pickerProps}>{placeholder}</Picker>;
};

export default Component;
