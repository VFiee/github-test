import React from "react";
import "./index.less";

type TransitionType =
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight";

export interface TransitionProps {
  show: boolean;
  name: TransitionType;
  children: React.ReactElement;
}

const Transition = (props: TransitionProps) => {
  const { name, children, show } = props;
  return React.createElement(children.type, {
    ...(children.props || {}),
    className: `__transition__ __transition__${name}__ ${
      show ? `__transition__${name}__active__` : ""
    } ${children.props.className || ""}`,
  });
};

export default Transition;
