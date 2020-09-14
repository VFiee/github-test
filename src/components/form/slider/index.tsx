import React from "react";
import { Slider } from "@tarojs/components";
import { SliderProps } from "@tarojs/components/types/Slider.d";
import { BaseField } from "../fieldItem";
import "../index.less";

interface InternalSliderProps extends SliderProps, BaseField {}

const Component = (props: InternalSliderProps) => {
  const { fieldValue, fieldChange, onChange, ...sliderProps } = props;
  const getSliderValue = (): number => {
    return fieldValue === undefined ? sliderProps?.value || 0 : fieldValue;
  };
  return (
    <Slider
      {...sliderProps}
      value={getSliderValue()}
      onChange={(eve) => {
        onChange && onChange(eve);
        fieldChange(eve.detail.value);
      }}
      className={`__slider__ ${sliderProps?.className || ""}`}
    />
  );
};
export { SliderProps };
export default Component;
