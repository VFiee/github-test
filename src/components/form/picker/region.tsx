import React from "react";
import { Picker, View } from "@tarojs/components";
import { PickerRegionProps } from "@tarojs/components/types/Picker";
import { ViewProps } from "@tarojs/components/types/View";
import { isFunction, isEmpty } from "@Util/index";
import { BaseField } from "../field";
import "./index.less";

interface PlaceholderProps {
  placeholder: string;
  placeholderProps?: ViewProps;
  placeholderSeparator?: string;
}

export interface RegionSelectorProps
  extends PickerRegionProps,
    PlaceholderProps {}

interface InternalRegionSelectProps extends RegionSelectorProps, BaseField {}

const Component = (props: InternalRegionSelectProps) => {
  const {
    fieldValue = [],
    fieldChange,
    placeholder,
    placeholderProps,
    placeholderSeparator = "-",
    className,
    onChange,
    ...pickerProps
  } = props;
  return (
    <Picker
      {...pickerProps}
      value={fieldValue}
      mode="region"
      onChange={(eve) => {
        const _value = isFunction(onChange) ? onChange(eve) : eve.detail.value;
        fieldChange(_value);
      }}
    >
      <View
        {...placeholderProps}
        className={`${isEmpty(fieldValue) ? `__picker_placeholder__` : ""} ${
          className || ""
        }`}
      >
        {isEmpty(fieldValue)
          ? placeholder
          : fieldValue.join(placeholderSeparator)}
      </View>
    </Picker>
  );
};

export default Component;
