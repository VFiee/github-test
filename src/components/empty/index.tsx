import React from "react";
import { View, Image, Text, StandardProps } from "@tarojs/components";
import { ImageProps } from "@tarojs/components/types/Image";
import { TextProps as BaseTextProps } from "@tarojs/components/types/Text";
import "./index.less";

interface ExtendTextProps extends BaseTextProps {
  value?: string;
}

export type TextProps = string | ExtendTextProps;

export interface BlankPorps {
  img?: ImageProps;
  wrap?: StandardProps;
  text?: TextProps;
}

const defaultImgProps: ImageProps = {
  mode: "aspectFit",
  className: "blank_img",
  src: `https://file.zhen22.com/weapp/blank@2x.png`,
};
const defaultWrapProps: StandardProps = {
  className: "blank_wrap",
};
const defaultTextProps: TextProps = {
  value: "暂无数据",
  className: "blank_text",
};

const Blank = (props: BlankPorps) => {
  const { img, wrap, text } = props;
  const imgProps = {
    ...defaultImgProps,
    ...img,
  };
  const wrapProps = {
    ...defaultWrapProps,
    ...wrap,
  };
  const textProps: ExtendTextProps = !!text
    ? typeof text === "string"
      ? { ...defaultTextProps, value: text }
      : {
          ...defaultTextProps,
          ...text,
        }
    : defaultTextProps;
  const textValue = textProps?.value;
  return (
    <View {...wrapProps}>
      <Image {...imgProps} src={props?.img?.src || defaultImgProps.src} />
      {!!textValue && <Text {...textProps}>{textValue}</Text>}
    </View>
  );
};

export default Blank;
