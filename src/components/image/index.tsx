import React, { useState } from "react";
import { View, Image } from "@tarojs/components";
import { ImageProps as _ImageProps } from "@tarojs/components/types/Image";
import Loading from "@Components/loading";
import Icon from "@Components/icon";
import "./index.less";

export interface ImageProps extends _ImageProps {
  src: string;
  showLoading?: boolean;
  loadingIcon?: string;
  loading?: React.ReactElement;
  showError?: boolean;
  errorIcon?: string;
  error?: React.ReactElement;
  round?: boolean;
  radius?: string;
  width?: string;
  height?: string;
}

const defaultImageProps: ImageProps = {
  showLoading: true,
  loading: <Loading type="spinner" />,
  showError: true,
  error: <Image src="" mode="aspectFill" className="__error__image__" />,
} as ImageProps;

const Component = (props: ImageProps) => {
  const {
    showLoading,
    loadingIcon,
    loading,
    showError,
    errorIcon,
    error,
    round,
    radius,
    width,
    height,
    onLoad,
    onError,
    className,
    style,
    ...restProps
  } = {
    ...defaultImageProps,
    ...props,
  };
  const [status, setStatus] = useState({
    loading: true,
    error: false,
    load: false,
  });
  function _onLoad(eve) {
    setStatus({ ...status, load: true, loading: false });
    onLoad && onLoad(eve);
  }
  function _onError(eve) {
    setStatus({ load: true, loading: false, error: true });
    onError && onError(eve);
  }
  function getStyle(_style) {
    const baseStyle = {
      width,
      height,
      borderRadius: radius,
    };
    if (!_style) return baseStyle;
    return typeof _style === "string"
      ? `${baseStyle}${style}`
      : {
          ...baseStyle,
          ...(style as React.CSSProperties),
        };
  }
  return (
    <View
      className={`__image__ ${round ? `__image__round__` : ""} ${
        className || ""
      }`}
      style={getStyle(style)}
    >
      {!status.error && (
        <Image
          {...restProps}
          onLoad={_onLoad}
          onError={_onError}
          className="__image__origin__"
        />
      )}
      {showLoading && status.loading && (
        <View className="__image__loading__">
          {loading ? loading : <Icon type={loadingIcon} size="50rpx" />}
        </View>
      )}
      {showError && status.error && (
        <View className="__image__error__">
          {error ? error : <Icon type={errorIcon} size="50rpx" />}
        </View>
      )}
    </View>
  );
};

Component.options = {
  addGlobalClass: true,
};

export default Component;
