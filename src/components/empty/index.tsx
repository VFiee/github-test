import React, { ReactElement } from "react";
import { View } from "@tarojs/components";
import Icon, { IconProps } from "@Components/icon";
import "./index.less";

export type EmptyType = "empty" | "network" | "error";

export interface EmptyProps {
  image?: EmptyType | IconProps;
  className?: string;
  description?: string;
  children?: string | ReactElement;
  onClick?: Function;
}

type DefaultIconProps = {
  [key: string]: IconProps;
};

const defaultIcons: DefaultIconProps = {
  empty: {
    size: "160rpx",
    type: `icon-empty`,
    color: "#999",
  },
  error: {
    size: "160rpx",
    color: "#FF5722",
    type: `icon-network_error1`,
  },
  network: {
    size: "160rpx",
    color: "red",
    type: `icon-network-error`,
  },
};

const defaultEmptyProps = {
  image: "empty",
};

const defaultIconTypes = ["empty", "network", "error"];

const Empty = (props: EmptyProps) => {
  let { image, className, description, onClick } = {
    ...defaultEmptyProps,
    ...props,
  };
  if (typeof image === "string") {
    image = defaultIconTypes.includes(image) ? image : "empty";
  }
  const iconProps: IconProps =
    typeof image === "string" ? defaultIcons[image] : image;
  return (
    <View
      className={`__empty__ ${className ?? ""}`}
      onClick={(eve) => onClick?.(eve)}
    >
      <Icon {...iconProps} />
      {!!description && (
        <View className="__empty__description__">{description}</View>
      )}
      {props?.children}
    </View>
  );
};

Empty.options = {
  addGlobalClass: true,
};

export default Empty;
