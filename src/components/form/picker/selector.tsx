import React, { useMemo } from "react";
import { get, findIndex, indexOf } from "lodash";
import { Picker, View } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { PickerSelectorProps } from "@tarojs/components/types/Picker";
import { isObject, isUndefined } from "@Util/index";
import { BaseField } from "../field";
import "./index.less";

export interface CommonPickerProps {
  placeholder: string;
  placeholderProps?: ViewProps;
  rangeValueKey?: string;
}

export interface SelectorProps extends PickerSelectorProps, CommonPickerProps {}

interface InternalPickerProps extends BaseField, SelectorProps {}

const getPickerShowText = (
  props: InternalPickerProps,
  index: number
): string => {
  const { range = [], rangeKey = "" } = props;
  return isObject(range[index])
    ? get(range, `[${index}].${rangeKey}`)
    : range[index];
};

const pickerValueToIndex = (props: InternalPickerProps): number | null => {
  const { rangeValueKey, fieldValue, range } = props;
  if (isObject(range[0])) {
    if (isUndefined(fieldValue) || fieldValue === "" || !rangeValueKey) {
      return null;
    }
    const index = findIndex(range, { [rangeValueKey]: fieldValue });
    return index > -1 ? index : null;
  }
  const index = indexOf(range, fieldValue);
  return isUndefined(fieldValue) || index === -1 ? null : index;
};

const pickerIndexToValue = (
  props: InternalPickerProps,
  index: number
): string => {
  const { range, rangeValueKey = "" } = props;
  if (isObject(range[index])) {
    return get(range, `${index}.${rangeValueKey}`);
  }
  return range[index] as string;
};

const Component = (props: InternalPickerProps) => {
  const {
    placeholder,
    fieldValue,
    fieldChange,
    className = "",
    rangeValueKey,
    placeholderProps,
    ...pickerProps
  } = props;
  const value = useMemo(() => pickerValueToIndex(props), [props]);
  const pickerValue = useMemo(() => getPickerShowText(props, value as number), [
    props,
    value,
  ]);
  return (
    <Picker
      {...pickerProps}
      value={value as number}
      className={`__selector_picker__ ${className}`}
      onChange={(eve) => {
        fieldChange(pickerIndexToValue(props, eve.detail.value));
      }}
    >
      <View
        className={`${value == null ? "__picker_placeholder__" : ""} ${
          placeholderProps?.className || ""
        }`}
      >
        {value == null ? placeholder : pickerValue}
      </View>
    </Picker>
  );
};

export default Component;
