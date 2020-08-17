import React, { Fragment } from "react";
import { Text, Checkbox, Label, CheckboxGroup } from "@tarojs/components";
import { CheckboxProps } from "@tarojs/components/types/Checkbox";
import { LabelProps } from "@tarojs/components/types/Label";
import { CheckboxGroupProps } from "@tarojs/components/types/CheckboxGroup";

interface ExtendsCheckboxProps extends CheckboxProps {
  label: string;
}
interface InternalCheckboxProps extends CheckboxGroupProps {
  delimiter?: string;
  labelProps?: LabelProps;
  onChange?: (args: any) => void;
  options: ExtendsCheckboxProps[];
}

const Component = (props: InternalCheckboxProps) => {
  const {
    options = [],
    delimiter = ",",
    onChange,
    labelProps,
    ...cheboxGroupProps
  } = props;
  return (
    <CheckboxGroup
      {...cheboxGroupProps}
      onChange={(eve) => {
        onChange?.(eve.detail.value.join(delimiter));
      }}
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
              <Checkbox {...restProps} />
              <Text>{label}</Text>
            </Label>
          </Fragment>
        );
      })}
    </CheckboxGroup>
  );
};

export { InternalCheckboxProps as CheckboxProps };

export default Component;
