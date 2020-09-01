import React from "react";
import { View } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import "./index.less";

type ContentPosition = "left" | "right" | "center";

export interface DividerProps extends ViewProps {
  text?: string;
  hairLine?: boolean;
  contentPosition?: ContentPosition;
}

const defaultEmptyProps: DividerProps = {
  text: "",
  hairLine: true,
  contentPosition: "center",
};

const Divider = (props: DividerProps) => {
  const { hairLine, contentPosition, text, className = "", ...dividerProps } = {
    ...defaultEmptyProps,
    ...props,
  };
  return (
    <View
      {...dividerProps}
      className={`__divider__ ${hairLine ? "__divider__hairline" : ""} ${
        !!text ? `__divider__position__${contentPosition}` : ""
      } ${className}`}
    >
      {text}
    </View>
  );
};

Divider.options = {
  addGlobalClass: true,
};

export default Divider;
