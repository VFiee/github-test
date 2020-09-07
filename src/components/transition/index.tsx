import React from "react";
import { useTransition } from "@Hooks/index";
import { mergeStyle } from "@Util/index";

export type TransitionType =
  | "fade"
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight";

export interface TransitionProps {
  show: boolean;
  duration?: number; //ms
  name: TransitionType;
  children: React.ReactElement;
}

const Transition = (props: TransitionProps) => {
  const { name, show, duration = 300 } = props;
  const {
    inited,
    display,
    className,
    onTransitionEnd,
    transitionDuration,
  } = useTransition({
    show,
    name,
    transitionDuration: duration,
  });
  if (!inited) return null;
  const { type, props: _props, ...otherProps } = props.children;
  return React.createElement(type, {
    ...otherProps,
    ..._props,
    onTransitionEnd,
    className: `__transition__ ${className} ${_props?.className ?? ""}`,
    style: `transition-duration:${transitionDuration}ms;${
      display ? "" : "display:none;"
    }${_props.style ? mergeStyle(_props.style) : ""}`,
  });
};

export default Transition;
