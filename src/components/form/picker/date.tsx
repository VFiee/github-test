import React from "react";
import { Picker, View } from "@tarojs/components";
import { PickerDateProps } from "@tarojs/components/types/Picker";
import { ViewProps } from "@tarojs/components/types/View";
import day, { Dayjs } from "dayjs";
import { BaseField } from "../field";
import "./index.less";

interface PlaceholderProps {
  placeholder: string;
  placeholderProps?: ViewProps;
}

export interface DateSelectorProps
  extends PickerDateProps,
    PlaceholderProps,
    BaseField {
  timestamp?: boolean;
}

interface InternalDateSelectProps extends DateSelectorProps {}

const fieldFormat = {
  year: "YYYY",
  month: "YYYY-MM",
  day: "YYYY-MM-DD",
};
const timeToString = (
  time: string | number,
  field?: string
): string | number => {
  if (time == null || time === "") return "";
  if (typeof time === "string") {
    const date = new Date(time.split("-").join("/"));
    return Math.floor(date.getTime() / 1000);
  }
  let date: Dayjs = day(time.toString().length === 13 ? time : time * 1000);
  return date.format(field ? fieldFormat[field] : fieldFormat.day);
};

const Component = (props: InternalDateSelectProps) => {
  const {
    fieldValue,
    fieldChange,
    placeholder,
    className,
    timestamp = true,
    ...pickerProps
  } = props;
  const value = timestamp
    ? (timeToString(fieldValue, props?.fields) as string)
    : fieldValue || "";
  return (
    <Picker
      {...pickerProps}
      mode="date"
      value={value}
      onChange={(eve) => {
        const _value = timestamp
          ? timeToString(eve.detail.value, props?.fields)
          : eve.detail.value;
        fieldChange(_value);
      }}
    >
      <View
        className={`${value === "" ? `__picker_placeholder__` : ""} ${
          className || ""
        }`}
      >
        {value == "" ? placeholder : value}
      </View>
    </Picker>
  );
};

export default Component;
