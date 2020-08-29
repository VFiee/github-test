import React, { ReactElement } from "react";
import { View, Image } from "@tarojs/components";
import EmptyImage from "./empty.png";
import "./index.less";

export interface EmptyProps {
  image?: string;
  imageClassName?: string;
  className?: string;
  description?: string;
  children?: string | ReactElement;
}

const Empty = (props: EmptyProps) => {
  const { image, imageClassName, className, description } = props;
  return (
    <View className={`__empty__ ${className || ""}`}>
      <View className={`__empty__image__box__ ${imageClassName || ""}`}>
        <Image
          mode="aspectFit"
          src={image || EmptyImage}
          className="__empty__image__"
        />
      </View>
      {!!description && (
        <View className="__empty__description">{description}</View>
      )}
      {props?.children}
    </View>
  );
};

export default Empty;
