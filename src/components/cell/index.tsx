import React, { useMemo } from "react";
import { View, Text } from "@tarojs/components";
import { IconProps } from "@Components/icon";
import { ViewProps } from "@tarojs/components/types/View";
import { CustomElement, CustomStyle } from "@Components/type";
import {
  isFunction,
  isNull,
  isReactElement,
  isUndefined,
  navigateTo,
  redirectTo,
} from "@Util/index";
import { Icon } from "@Components/index";
import "./index.less";

export interface CellGroupProps extends ViewProps {
  title?: CustomElement;
  titleClass?: string;
  titleStyle?: CustomStyle;
  border?: boolean;
  children?: CustomElement;
}

export type ArrowDirection = "left" | "right" | "up" | "down";

export interface CellProps extends ViewProps {
  title?: CustomElement;
  titleClass?: string;
  titleStyle?: CustomStyle;
  value: CustomElement;
  valueClass?: string;
  valueStyle?: CustomStyle;
  label?: CustomElement;
  labelClass?: string;
  labelStyle?: CustomStyle;
  icon?: CustomElement | IconProps;
  rightIcon?: CustomElement | IconProps;
  url?: string;
  replace?: boolean;
  required?: boolean;
  center?: boolean;
  arrow?: boolean;
  arrowDirection?: ArrowDirection;
  children?: CustomElement;
}

const Cell = (props: CellProps) => {
  const {
    title,
    titleClass,
    titleStyle,
    value,
    valueClass,
    valueStyle,
    label,
    labelClass,
    labelStyle,
    icon,
    rightIcon,
    url,
    replace,
    required,
    arrow,
    arrowDirection,
    center,
    className,
    onClick,
    ...restProps
  } = props;

  const _label = useMemo(() => {
    if (isUndefined(label)) return null;
    return isReactElement(label) ? (
      label
    ) : (
      <View
        className={`__cell__label__ ${labelClass ?? ""}`}
        style={labelStyle ?? ""}
      >
        {label}
      </View>
    );
  }, [label, labelClass, labelStyle]);

  const _icon = useMemo(() => {
    if (isUndefined(icon) && !required) return null;
    let _iconProps = (typeof icon === "string"
      ? { type: icon }
      : icon) as IconProps;
    if (required) {
      _iconProps = {
        type: "icon-required1",
        className: "__cell__icon__required__",
      };
    }
    return isReactElement(icon) ? (
      icon
    ) : (
      <Icon
        {..._iconProps}
        className={`__cell__left__icon__ ${_iconProps?.className ?? ""}`}
      />
    );
  }, [icon, required]);

  const _rightIcon = useMemo(() => {
    if (isUndefined(rightIcon) && !arrow) return null;
    let _iconProps = (typeof rightIcon === "string"
      ? { type: rightIcon }
      : rightIcon) as IconProps;
    if (arrow) {
      _iconProps = {
        type: "icon-back5",
        className: `__cell__icon__arrow__ ${arrowDirection ?? "right"}`,
      };
    }
    return isReactElement(rightIcon) ? (
      rightIcon
    ) : (
      <Icon
        {..._iconProps}
        className={`__cell__right__icon__ ${_iconProps?.className ?? ""}`}
      />
    );
  }, [arrow, arrowDirection, rightIcon]);

  const _title = useMemo(() => {
    if (isUndefined(title)) return null;
    return isReactElement(title) ? (
      title
    ) : (
      <View
        style={titleStyle ?? ""}
        className={`__cell__title__ ${titleClass ?? ""}`}
      >
        <Text>{title}</Text>
        {_label}
      </View>
    );
  }, [_label, title, titleClass, titleStyle]);

  const _value = useMemo(() => {
    return isReactElement(value) ? (
      value
    ) : (
      <View
        className={`__cell__value__ ${
          isNull(_title) ? "__cell__value__only__" : ""
        } ${valueClass ?? ""}`}
        style={valueStyle ?? ""}
      >
        {value}
      </View>
    );
  }, [_title, value, valueClass, valueStyle]);

  return (
    <View
      {...restProps}
      onClick={(eve) => {
        const isUrl = typeof url === "string";
        if (isFunction(onClick)) {
          // @ts-ignore
          isUrl ? onClick({ replace, url }, eve) : onClick(eve);
        }
        if (!isUrl) return;
        // @ts-ignore
        replace ? redirectTo(url) : navigateTo({ url });
      }}
      className={`__cell__ ${center ? "__cell__center__" : ""} ${
        className ?? ""
      }`}
    >
      {_icon}
      {_title}
      {_value}
      {_rightIcon}
      {props?.children}
    </View>
  );
};

const defaultCellGroupProps: CellGroupProps = {
  border: true,
};
const CellGroup = (props: CellGroupProps): typeof CellGroup => {
  const { title, titleClass, titleStyle, border, className, ...restProps } = {
    ...defaultCellGroupProps,
    ...props,
  };

  const cellGroup = useMemo(
    () => (
      <View
        {...restProps}
        className={`__cell__group__ ${border ? "border-top-bottom" : ""} ${
          className ?? ""
        }`}
      >
        {props?.children}
      </View>
    ),
    [border, className, props, restProps]
  );

  const titleComponent = useMemo(() => {
    if (isUndefined(title)) return null;
    return !isReactElement(title) ? (
      <View
        style={titleStyle}
        className={`__cell__group__title__ ${titleClass}`}
      >
        {title}
      </View>
    ) : (
      title
    );
  }, [title, titleClass, titleStyle]);

  return title ? (
    <React.Fragment>
      {titleComponent}
      {cellGroup}
    </React.Fragment>
  ) : (
    cellGroup
  );
};

export { Cell as default, CellGroup };
