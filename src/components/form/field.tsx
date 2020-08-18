/* eslint-disable */
import React, { Fragment } from "react";
import { get } from "lodash";
import { View, Text, Label } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { LabelProps } from "@tarojs/components/types/Label";
import { useUpdate } from "@/hooks";
import Form from "./_form";
import Input, { InputProps } from "./input";
import Radio, { RadioProps } from "./radio";
import Checkbox, { CheckboxProps } from "./checkbox";
import Picker, { PickerProps } from "./picker";
import Slider, { SliderProps } from "./slider";
import Switch, { SwitchProps } from "./switch";
import Textarea, { TextareaProps } from "./textarea";
import "./index.less";

type FieldType =
  | "input"
  | "radio"
  | "checkbox"
  | "slider"
  | "switch"
  | "textarea"
  | "picker";

export interface FieldRule {
  min?: number;
  max?: number;
  required?: boolean;
  message: string;
  pattern?: RegExp;
  transform?: (value: any) => any;
  validator?: (rule: FieldRule, value: any, form: Form) => Promise<any>;
}

export interface BaseField {
  fieldChange: (args: any) => any;
  fieldValue: any;
}

export type FieldProps = ViewProps & {
  label: string;
  labelProps?: LabelProps;
  fieldKey: string;
  fieldType: FieldType;
  wrapperProps?: ViewProps;
  rules?: FieldRule[];
  form?: Form;
  errorProps?: ViewProps;
  fieldProps:
    | InputProps
    | RadioProps
    | CheckboxProps
    | SliderProps
    | SwitchProps
    | TextareaProps
    | PickerProps;
};

const Field = (props: FieldProps) => {
  const {
    label,
    labelProps,
    fieldKey,
    fieldType,
    fieldProps,
    wrapperProps,
    form,
    errorProps,
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
    fieldType,
    Input
  );
  const update = useUpdate();
  const onChange = (value: any) => {
    form?.setFieldsValue({ key: fieldKey, value }, update);
  };
  const isRequired = rules?.some((rule) => rule?.required === true);
  const fieldErr = form?.getFieldsError(fieldKey);
  const fieldValue = form?.getFieldsValue(fieldKey);
  return (
    <Fragment>
      <View {...viewProps} className={`__form_item__ ${className || ""}`}>
        <Label
          {...labelProps}
          className={`__label__ ${labelProps?.className || ""}`}
        >
          <Text>{label}</Text>
          {!!isRequired && <Text className="__required__">*</Text>}
        </Label>
        <View
          {...wrapperProps}
          className={`__form_component_wrap__ ${wrapperProps?.className || ""}`}
        >
          <Component {...{ ...(fieldProps as any), onChange, fieldValue }} />
          {!!fieldErr && fieldErr.length > 0 && (
            <View
              {...errorProps}
              className={`__error_msg__ ${errorProps?.className || ""}`}
            >
              {fieldErr[0].rule.message}
            </View>
          )}
        </View>
      </View>
    </Fragment>
  );
};

export default Field;
