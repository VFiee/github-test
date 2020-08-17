import React, { useState, useEffect } from "react";
import { Image } from "@tarojs/components";
import { ImageProps } from "@tarojs/components/types/Image";
import { getImageUrl } from "@/util";

export interface ImageOptions extends ImageProps {
  errorSrc?: string;
}

const default_img_src = getImageUrl("recommend");

function EImage(props: ImageOptions) {
  const { src: propsSrc, onError, errorSrc, ..._props } = props;
  const [src, setSrc] = useState(propsSrc);
  useEffect(() => {
    const finnalSrc = propsSrc || errorSrc || default_img_src;
    finnalSrc && setSrc(finnalSrc);
  }, [propsSrc, errorSrc]);
  function onImageError(eve) {
    errorSrc && setSrc(errorSrc || default_img_src);
    onError?.(eve);
  }
  return <Image {..._props} src={src} onError={onImageError} />;
}

export default EImage;
