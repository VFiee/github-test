import React, { useEffect, useState } from "react";
import { get, findIndex } from "lodash";
import { Picker, View } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { PickerSelectorProps } from "@tarojs/components/types/Picker";
import { isNull, isObject, isUndefined } from "@Util/index";
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
  return isUndefined(fieldValue) ? null : fieldValue;
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
  const pickerIndex = pickerValueToIndex(props);
  const [value, setValue] = useState(pickerIndex);
  useEffect(() => {
    setValue(pickerIndex);
  }, [pickerIndex]);
  const onPickerChange = (eve) => {
    fieldChange(pickerIndexToValue(props, eve.detail.value));
    setValue(eve.detail.value);
  };
  const showPlaceholder = isNull(value);
  return (
    <Picker
      {...pickerProps}
      onChange={onPickerChange}
      value={value as number}
      className={`__selector_picker__ ${className}`}
    >
      <View
        className={`${showPlaceholder ? "__picker_placeholder__" : ""} ${
          placeholderProps?.className || ""
        }`}
      >
        {showPlaceholder
          ? placeholder
          : getPickerShowText(props, value as number)}
      </View>
    </Picker>
  );
};

export default Component;
