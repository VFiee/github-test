import React, { Fragment } from "react";
import { Text, Checkbox, Label, CheckboxGroup } from "@tarojs/components";
import { CheckboxProps } from "@tarojs/components/types/Checkbox";
import { LabelProps } from "@tarojs/components/types/Label";
import { CheckboxGroupProps as BaseCheckboxGroupProps } from "@tarojs/components/types/CheckboxGroup";
import { BaseField } from "../fieldItem";

interface ExtendsCheckboxProps extends CheckboxProps {
  label: string;
}
interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  delimiter?: string;
  labelProps?: LabelProps;
  options: ExtendsCheckboxProps[];
}

interface InternalCheckboxProps extends CheckboxGroupProps, BaseField {}

const Component = (props: InternalCheckboxProps) => {
  const {
    options = [],
    delimiter = ",",
    labelProps,
    fieldValue,
    fieldChange,
    ...cheboxGroupProps
  } = props;
  const isCheckboxChecked = (option: ExtendsCheckboxProps): boolean => {
    if (fieldValue != undefined) {
      return fieldValue.split(delimiter).includes(option.value);
    }
    return !!option.checked;
  };
  return (
    <CheckboxGroup
      {...cheboxGroupProps}
      onChange={(eve) => fieldChange(eve.detail.value.join(delimiter))}
      className={`__checkbox_group__ ${cheboxGroupProps?.className || ""}`}
    >
      {options.map((option) => {
        const { label, ...restProps } = option;
        return (
          <Fragment key={label}>
            <Label
              {...labelProps}
              className={`__checkbox__label__ ${labelProps?.className || ""}`}
            >
              <Checkbox {...restProps} checked={isCheckboxChecked(option)} />
              <Text>{label}</Text>
            </Label>
          </Fragment>
        );
      })}
    </CheckboxGroup>
  );
};

export { CheckboxGroupProps as CheckboxProps };

export default Component;
