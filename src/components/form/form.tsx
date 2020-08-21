import React, { useImperativeHandle, useRef } from "react";
import { View } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { BaseObject } from "@/types";
import { FieldProps } from "@/components/form/field";
import { useUpdate } from "@Hooks/index";
import FormIns from "./_form";
import Field from "./field";

export interface FormProps extends ViewProps {
  name: string;
  fields?: FieldProps[];
  onSubmit?: (data: any) => any;
  onReset?: () => void;
  onError?: (...args) => void;
  initialValues?: BaseObject;
  onFieldsChange?: (changeFields, allFields) => void;
}

const Form = React.forwardRef((props: FormProps, ref) => {
  const {
    name,
    fields = [],
    onSubmit,
    onReset,
    onError,
    initialValues = {},
    onFieldsChange,
    className,
    ...restProps
  } = props;
  const update = useUpdate();
  const { current: form } = useRef(
    new FormIns({
      update,
      onReset,
      onSubmit,
      initialValues,
      rules: fields.map((field) => ({
        key: field.fieldKey,
        rules: field.rules || [],
      })),
    })
  );
  useImperativeHandle(ref, () => form);
  return (
    <View {...restProps} ref={ref} className={`__form ${className || ""}`}>
      {fields.map((field: FieldProps) => (
        <Field {...field} key={field.fieldKey} form={form} />
      ))}
    </View>
  );
});

export default Form;
