import React, { useMemo } from "react";
import { View, Image, CoverView, CoverImage } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import { mergeStyle } from "@Util/index";
import "./index.less";

export interface IconProps extends ViewProps {
  isCover?: boolean;
  type: string;
  size?: string;
  color?: string;
  className?: string;
  fontFamily?: string;
  localImage?: boolean;
  style?: React.CSSProperties | string;
  children?: string | React.ReactElement;
}

const defaultIconProps = {
  isCover: false,
  fontFamily: "iconfont",
};

const Icon = (props: IconProps) => {
  const {
    type,
    size,
    color,
    style,
    localImage,
    className,
    fontFamily,
    isCover,
    ...rest
  } = {
    ...defaultIconProps,
    ...props,
  };
  const isImage = localImage || (type && type.indexOf("/") !== -1);
  const mergedStyle = useMemo(
    () =>
      mergeStyle(
        {
          color: color ?? "",
          fontSize: size ?? "",
        },
        style
      ),
    [style, color, size]
  );
  const CView = isCover ? CoverView : View;
  const CImage = isCover ? CoverImage : Image;
  let imageProps = {
    src: type,
    className: "__icon__origin__image__",
  };
  if (!isCover) {
    imageProps["mode"] = "aspectFill";
  }
  return (
    <CView
      {...rest}
      style={mergedStyle}
      className={`__icon__ ${isImage ? `__icon__image__` : fontFamily} ${
        isImage ? "" : type
      } ${className ?? ""}`}
    >
      {isImage && <CImage {...imageProps} />}
      {props.children}
    </CView>
  );
};
Icon.options = {
  addGlobalClass: true,
};
export default Icon;
