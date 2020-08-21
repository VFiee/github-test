import React from "react";
import { Picker } from "@tarojs/components";
import { PickerMultiSelectorProps } from "@tarojs/components/types/Picker";
import { CommonPickerProps } from "./selector";
import { BaseField } from "../field";

export interface MultiSelectorProps
  extends PickerMultiSelectorProps,
    CommonPickerProps {}

interface InternalPickerProps extends BaseField, MultiSelectorProps {}

const Component = (props: InternalPickerProps) => {
  const { placeholder, ...pickerProps } = props;
  return (
    <Picker {...pickerProps}>
      {/* <View
        className={`${value === fakeNumber ? "__picker_placeholder__" : ""} ${
          placeholderProps?.className || ""
        }`}
      >
        {value === fakeNumber ? placeholder : getPickerShowText(props, value)}
      </View> */}
      {placeholder}
    </Picker>
  );
};

export default Component;
