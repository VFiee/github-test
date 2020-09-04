import React from "react";
import { View } from "@tarojs/components";
import { mergeStyle } from "@/util";
import { useMenuButton } from "@/hooks";
import "./index.less";

export interface OverlayProps {
  show: boolean;
  className?: string;
  opacity?: number | string;
  zIndex?: number | string;
  duration?: number | string;
  style?: React.CSSProperties | string;
  preventScroll?: boolean;
  onClick?: (eve: any) => void;
  customAppbar?: boolean;
  children?: React.ReactElement | string;
}

const defaultOverlayProps: OverlayProps = {
  show: false,
  zIndex: 1,
  duration: 0.3,
  preventScroll: true,
  customAppbar: false,
  opacity: 0.6,
};

const Overlay = (props: OverlayProps) => {
  const {
    show,
    style,
    zIndex,
    onClick,
    opacity,
    duration,
    className,
    preventScroll,
    customAppbar,
  } = {
    ...defaultOverlayProps,
    ...props,
  };
  const { wrapStyle } = useMenuButton();
  const top = wrapStyle?.height;
  const _mergeStyle = mergeStyle(
    {
      zIndex: zIndex as number,
      transitionDuration:
        typeof duration === "string" ? duration : duration + "s",
    },
    style
  );
  customAppbar && (_mergeStyle["top"] = top);
  opacity &&
    show &&
    (_mergeStyle["backgroundColor"] = `rgba(0,0,0,${opacity})`);
  console.log(props);

  return (
    <View
      style={_mergeStyle}
      className={`__overlay__ ${className || ""} ${
        show ? `__overlay__show__` : ""
      }`}
      onClick={(eve) => {
        preventScroll && eve.preventDefault();
        onClick && onClick(eve);
      }}
    >
      {props.children}
    </View>
  );
};

export default Overlay;
