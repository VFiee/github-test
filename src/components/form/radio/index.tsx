import React from "react";
import { RadioGroup, Label, Radio, Text } from "@tarojs/components";
import { LabelProps } from "@tarojs/components/types/Label";
import { RadioProps as _RadioProps } from "@tarojs/components/types/Radio";
import { RadioGroupProps } from "@tarojs/components/types/RadioGroup";
import { BaseField } from "../field";
import "../index.less";

interface ExtendsRadioProps extends _RadioProps {
  label: string;
}

interface InternalRadioProps extends RadioProps, BaseField {}

export interface RadioProps extends RadioGroupProps {
  labelProps?: LabelProps;
  options: ExtendsRadioProps[];
}

const Component = (props: InternalRadioProps) => {
  const {
    options = [],
    labelProps,
    fieldValue,
    fieldChange,
    ...radioGroupProps
  } = props;
  const isRadioChecked = (option: ExtendsRadioProps): boolean => {
    if (fieldValue != undefined) {
      return fieldValue == option.value;
    }
    return !!option.checked;
  };
  return (
    <RadioGroup
      {...radioGroupProps}
      onChange={(eve) => fieldChange(eve.detail.value)}
      className={`__radio_group__ ${radioGroupProps?.className || ""}`}
    >
      {options.map((option) => {
        const { label, ...radioProps } = option;
        return (
          <Label
            {...labelProps}
            key={option.value}
            className={`__radio__label__ ${labelProps?.className || ""}`}
          >
            <Radio {...radioProps} checked={isRadioChecked(option)} />
            <Text>{label}</Text>
          </Label>
        );
      })}
    </RadioGroup>
  );
};

export default Component;
