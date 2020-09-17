import React, { useRef } from "react";
import { View } from "@tarojs/components";
import { Cell, Icon } from "@Components/index";
import { IconProps } from "@Components/icon";
import { CellProps } from "@Components/cell";
import { compact, isFunction, isUndefined, pick } from "@Util/index";
import { CustomStyle, CustomTextAlign, CustomElement } from "@Components/type";
import { useUpdate } from "@Hooks/index";
import Input, { InputProps } from "./baseInput";
import "./index.less";

type FieldType =
  | "text"
  | "number"
  | "idcard"
  | "digit"
  | "tel"
  | "password"
  | "textarea";

type ClearTriggerType = "focus" | "always";

type FormatTriggleType = "onChange" | "onBlur";

type Formatter = (value: any) => any;

export interface Rule {
  required?: boolean;
  message?: string | ((value: any, rule: Rule) => string);
  validator?: (value: any, rule: Rule) => boolean | Promise<any>;
  pattern?: RegExp;
  triggle?: FormatTriggleType;
  formatter?: (value: any, rule: Rule) => any;
}

export interface FieldProps
  extends Omit<InputProps, "type" | "placeholderStyle"> {
  // Input
  type?: FieldType;
  inputClass?: string;
  inputStyle?: CustomStyle;
  inputAlign?: CustomTextAlign;
  // Cell
  colon?: boolean;
  leftIcon?: CustomElement | IconProps;
  rightIcon?: CustomElement | IconProps;
  label?: CustomElement;
  labelClass?: string;
  labelStyle?: CustomStyle;
  labelAlign?: CustomTextAlign;
  required?: boolean;
  center?: boolean;
  // Others
  showWordLimit?: boolean; // 需要设置 maxlength属性
  limitClass?: string;
  limitStyle?: CustomStyle;
  clear?: boolean | IconProps; // 自定义clear icon 或 默认icon样式
  clearTrigger?: ClearTriggerType; // 当输入框有内容时, 显示清除图标的时机, always一直显示, focus 聚焦显示
  showError?: boolean;
  errorMsg?: string;
  errorClass?: string;
  errorStyle?: CustomStyle;
  errorAlign?: CustomTextAlign;
  // format
  formatter?: Formatter;
  formatTrigger?: FormatTriggleType;
  // Rule
  rules?: Rule[];
  // Children
  children?: CustomElement;
  // Events
  onClear?: Function;
  onInputClick?: Function;
  onLeftIconClick?: Function;
  onRightIconClick?: Function;
}

const defaultFieldProps = {
  type: "text",
  fixed: false,
  autoHeight: true,
  maxlength: 200,
  showConfirmBar: false,
  disableDefaultPadding: true,
  clear: false,
  clearTrigger: "focus",
  showWordLimit: false,
  inputAlign: "left",
  error: false,
  formatTriggleType: "onChange",
  placeholderClass: "input-placeholder",
};

const getCellProps = (props: FieldProps): CellProps => {
  const {
    colon,
    leftIcon,
    rightIcon,
    required,
    center,
    label,
    labelClass,
    labelStyle,
    labelAlign,
    inputAlign,
  } = props;
  return compact(
    {
      colon,
      icon: leftIcon,
      rightIcon,
      required,
      center,
      title: label,
      titleStyle: labelStyle,
      titleClass: `__field__label__ ${
        labelAlign ? `__field__label__${labelAlign}__` : ""
      } ${labelClass ?? ""} `,
      value: "",
      valueClass: `__field__value__ ${
        inputAlign ? `__field__value__${inputAlign}__` : ""
      }`,
    },
    isUndefined
  ) as CellProps;
};

const getInputProps = (props: FieldProps): InputProps => {
  const {
    type,
    maxlength,
    onInputClick,
    inputClass,
    fixed,
    autoHeight,
    showConfirmBar,
    disableDefaultPadding,
    onLineChange,
  } = props;
  let inputProps = pick(props, [
    // input
    "value",
    "placeholder",
    "placeholderClass",
    "placeholderStyle",
    "disabled",
    "cursorSpacing",
    "focus",
    "confirmType",
    "confirmHold",
    "alwaysEmbed",
    "cursor",
    "selectionStart",
    "selectionEnd",
    "adjustPosition",
    "holdKeyboard",
    "inputStyle",
    "onInput",
    "onFocus",
    "onBlur",
    "onConfirm",
    "onKeyboardHeightChange",
  ]);
  inputProps = {
    ...inputProps,
    isTextarea: type === "textarea",
    password: type === "password",
    type: type === "tel" ? "number" : type,
    maxlength: type === "tel" ? 11 : maxlength,
    onClick: onInputClick,
    className: `__field__control__ ${
      type === "textarea" ? "__field__textarea__" : ""
    } ${inputClass ?? ""}`,
  };
  if (inputProps.isTextarea) {
    delete inputProps["type"];
    inputProps = {
      ...inputProps,
      fixed,
      autoHeight,
      showConfirmBar,
      disableDefaultPadding,
      onLineChange,
    };
  }
  return compact(inputProps, isUndefined) as InputProps;
};

const getErrorProps = (props: FieldProps): object => {
  let { errorClass, errorStyle, errorAlign } = props;
  return compact(
    {
      style: errorStyle,
      className: `__field__error__ ${errorClass ?? ""} ${
        errorAlign ? `__field__error__${errorAlign}__` : ""
      }`,
    },
    isUndefined
  );
};

const getWordLimitProps = (props: FieldProps): object => {
  const { limitClass, limitStyle } = props;
  return compact(
    {
      style: limitStyle,
      className: `__field__limit__ ${limitClass ?? ""}`,
    },
    isUndefined
  );
};

const formatFn = (_value: any, fn?: Function): any => {
  return isFunction(fn) ? fn?.(_value) : _value;
};

const Field = (props: FieldProps) => {
  let { formatter, formatTrigger } = props;
  const update = useUpdate();
  let valueRef = useRef(props?.value ?? "");
  let focusRef = useRef(!!props?.focus);
  const onFocus = (eve) => {
    focusRef.current = true;
    props?.onFocus?.(eve);
    update();
  };
  const onBlur = (eve) => {
    focusRef.current = false;
    // 格式化
    if (formatTrigger === "onBlur") {
      valueRef.current = formatFn(valueRef.current, formatter);
    }
    props?.onBlur?.(eve);
    update();
  };
  const onInput = (eve) => {
    valueRef.current = eve.detail.value;
    // 格式化
    if (formatTrigger === "onChange") {
      valueRef.current = formatFn(valueRef.current, formatter);
    }
    if (isFunction(props.onInput)) {
      let callbackValue = (props.onInput as Function)(eve);
      if (!isUndefined(callbackValue)) {
        valueRef.current = callbackValue;
      }
    }
    console.log(`onInput:`, valueRef.current);
    update();
    console.log(`onInput:`, valueRef.current);
    // return value;
  };
  const _props = {
    ...defaultFieldProps,
    ...props,
    onFocus,
    onBlur,
    onInput,
    value: valueRef.current,
  } as FieldProps;
  const cellProps = getCellProps(_props);
  const errorProps = getErrorProps(_props);
  const wordLimitProps = getWordLimitProps(_props);
  const {
    showError,
    errorMsg,
    type,
    maxlength,
    clear,
    clearTrigger,
    onClear: _onClear,
  } = _props;

  const onClear = (eve) => {
    valueRef.current = "";
    focusRef.current = false;
    _onClear?.(eve);
    update();
  };
  console.log(`value:`, valueRef.current);

  const showClear =
    valueRef.current.length > 0 &&
    (clearTrigger === "focus" ? focusRef.current : true);

  const fieldValue = (
    <React.Fragment>
      <View className="__field__value__body__">
        <Input {...getInputProps(_props)} />
        {clear && (
          <Icon
            type="close-filled"
            className="__field__clear__"
            style={showClear ? `` : `display:none`}
            onClick={onClear}
          />
        )}
      </View>
      {type === "textarea" && (maxlength as number) > 0 && (
        <View {...wordLimitProps}>{`${
          valueRef.current?.length ?? 0
        }/${maxlength}`}</View>
      )}
      {!!showError && errorMsg && <View {...errorProps}>{errorMsg}</View>}
    </React.Fragment>
  );
  return (
    <Cell
      {...cellProps}
      className={`__field__ ${_props?.disabled ? `__field__disabled__` : ""} ${
        _props?.className ?? ""
      }`}
      value={fieldValue}
    ></Cell>
  );
};

export default Field;
