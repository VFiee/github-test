import React, { useMemo } from "react";
import { View, Image } from "@tarojs/components";
import { mergeStyle } from "@Util/style";
import "@/assets/fonts/iconfont/index.less";
import "./index.less";

export interface IconProps {
  type: string;
  size?: string;
  color?: string;
  className?: string;
  fontFamily?: string;
  style?: React.CSSProperties;
  localImage?: boolean;
  children?: string | React.ReactElement;
}

const Icon = (props: IconProps) => {
  const {
    type = "",
    size,
    color,
    style,
    localImage,
    className = "",
    fontFamily = "iconfont",
  } = props;
  const isImage = localImage || type.indexOf("/") !== -1;
  const mergedStyle = useMemo(
    () =>
      mergeStyle(
        {
          color,
          fontSize: size,
        },
        style
      ),
    [style, color, size]
  );
  return (
    <View
      style={mergedStyle}
      className={`__icon__ ${
        isImage ? `__icon__image__` : fontFamily
      } ${type} ${className}`}
    >
      {isImage && (
        <Image
          src={type}
          mode="aspectFill"
          className="__icon__origin__image__"
        />
      )}
      {props.children}
    </View>
  );
};
Icon.options = {
  addGlobalClass: true,
};
export default Icon;
