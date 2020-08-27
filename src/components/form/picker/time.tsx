import React from "react";
import { Picker, View } from "@tarojs/components";
import { PickerDateProps } from "@tarojs/components/types/Picker";
import { ViewProps } from "@tarojs/components/types/View";
import { isFunction } from "@/util";
import { BaseField } from "../field";
import "./index.less";

interface PlaceholderProps {
  placeholder: string;
  placeholderProps?: ViewProps;
}

export interface TimeSelectorProps extends PickerDateProps, PlaceholderProps {
  showTextFormat: (time: string) => string;
}

interface InternalDateSelectProps extends TimeSelectorProps, BaseField {}

const Component = (props: InternalDateSelectProps) => {
  const {
    fieldValue,
    fieldChange,
    placeholder,
    className,
    showTextFormat,
    ...pickerProps
  } = props;
  const timeText = isFunction(showTextFormat)
    ? showTextFormat(fieldValue)
    : fieldValue;
  return (
    <Picker
      {...pickerProps}
      mode="time"
      value={fieldValue || ""}
      onChange={(eve) => {
        fieldChange(eve.detail.value);
      }}
    >
      <View
        className={`${!fieldValue ? `__picker_placeholder__` : ""} ${
          className || ""
        }`}
      >
        {!fieldValue ? placeholder : timeText}
      </View>
    </Picker>
  );
};

export default Component;
