import React, { Fragment } from "react";
import { get } from "lodash";
import { View, Text, Label } from "@tarojs/components";
import { RadioProps } from "@tarojs/components/types/Radio";
import { SliderProps } from "@tarojs/components/types/Slider";
import { SwitchProps } from "@tarojs/components/types/Switch";
import { TextareaProps } from "@tarojs/components/types/Textarea";
import { ViewProps } from "@tarojs/components/types/View";
import { LabelProps } from "@tarojs/components/types/Label";
import {
  PickerTimeProps,
  PickerDateProps,
  PickerRegionProps,
  PickerSelectorProps,
  PickerMultiSelectorProps,
} from "@tarojs/components/types/Picker";
import { useUpdate } from "@/hooks";
import Form from "./_form";
import Input, { InputProps } from "./input";
import Radio from "./radio";
import Checkbox, { CheckboxProps } from "./checkbox";
import Picker from "./picker";
import Slider from "./slider";
import Switch from "./switch";
import Textarea from "./textarea";
import "./index.less";

type FieldType =
  | "input"
  | "checkbox"
  | "picker"
  | "radio"
  | "slider"
  | "switch"
  | "textarea";

type FieldItemProps =
  | InputProps
  | RadioProps
  | CheckboxProps
  | SliderProps
  | SwitchProps
  | TextareaProps
  | PickerSelectorProps
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
  | PickerRegionProps;

export interface ErrorProps extends ViewProps {}

export interface FieldRule {
  min?: number;
  max?: number;
  required?: boolean;
  message: string;
  pattern?: RegExp;
  transform?: (value: any) => any;
  validator?: (rule: FieldRule, value: any, form: Form) => Promise<any>;
}

export interface FieldProps extends ViewProps {
  label: string;
  labelProps?: LabelProps;
  fieldKey: string;
  type: FieldType;
  itemProps: FieldItemProps;
  wrapperProps?: ViewProps;
  rules?: FieldRule[];
  form?: Form;
  error?: ErrorProps;
}

const Field = (props: FieldProps) => {
  const {
    label,
    labelProps,
    fieldKey,
    type,
    itemProps,
    wrapperProps,
    form,
    error,
    rules,
    className,
    ...viewProps
  } = props;
  const Component = get(
    {
      input: Input,
      checkbox: Checkbox,
      picker: Picker,
      radio: Radio,
      slider: Slider,
      switch: Switch,
      textarea: Textarea,
    },
    type,
    Input
  );
  const update = useUpdate();
  const onChange = (value: any) => {
    form?.setFieldsValue({ key: fieldKey, value }, update);
  };
  const isRequired = rules?.some((rule) => rule?.required === true);
  const fieldErr = form?.getFieldsError(fieldKey);
  return (
    <Fragment>
      <View {...viewProps} className={`__form_item__ ${className || ""}`}>
        <Label
          {...labelProps}
          className={`__label__ ${labelProps?.className || ""}`}
        >
          {!!isRequired && <Text className="__required__">*</Text>}
          {label}:
        </Label>
        <View
          {...wrapperProps}
          className={`__form_component_wrap__ ${wrapperProps?.className || ""}`}
        >
          <Component {...itemProps} onChange={onChange} />
        </View>
      </View>
      {!!fieldErr && fieldErr.length > 0 && (
        <View {...error} className={`__error_msg__ ${error?.className || ""}`}>
          {fieldErr[0].rule.message}
        </View>
      )}
    </Fragment>
  );
};

export default Field;
