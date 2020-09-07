import React from "react";
import { View } from "@tarojs/components";
import { useMenuButton } from "@Hooks/index";
import { mergeStyle } from "@Util/index";
import Transition from "@Components/transition";
import "./index.less";

export interface OverlayProps {
  show: boolean;
  className?: string;
  customAppbar?: boolean;
  preventScroll?: boolean;
  opacity?: number | string;
  zIndex?: number | string;
  duration?: number | string;
  onClick?: (eve: any) => void;
  style?: React.CSSProperties | string;
  children?: React.ReactElement | string;
}

const defaultOverlayProps: OverlayProps = {
  show: false,
  zIndex: 1,
  opacity: 0.6,
  duration: 0.3,
  className: "",
  preventScroll: true,
  customAppbar: false,
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
  let _mergeStyle = mergeStyle(
    {
      zIndex: zIndex as number,
      transitionDuration:
        typeof duration === "string" ? duration : duration + "s",
      backgroundColor: `rgba(0,0,0,${opacity})`,
    },
    style
  );
  if (customAppbar) {
    _mergeStyle += ` top:${wrapStyle?.height ?? 0};`;
  }
  return (
    <Transition show={show} name="fade">
      <View
        onClick={onClick}
        style={_mergeStyle}
        className={`__overlay__ ${className}`}
        onTouchMove={(eve) => {
          preventScroll && eve.stopPropagation();
        }}
      >
        {props.children}
      </View>
    </Transition>
  );
};

export default Overlay;
