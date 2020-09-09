import React, { useState } from "react";
import _ from "lodash";
import {
  Swiper,
  SwiperItem,
  View,
  Text,
  StandardProps,
} from "@tarojs/components";
import { SwiperProps } from "@tarojs/components/types/Swiper";
import { SwiperItemProps } from "@tarojs/components/types/SwiperItem";
import Image from "@Components/image";
import { BaseObject } from "@Components/type";
import { mergeStyle, isEmpty, compactUndefined } from "@Util/index";
import "./index.less";

export type IndicatorType = "dots" | "numbers";

export type IndicatorPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "leftTop"
  | "leftCenter"
  | "leftRight"
  | "rightTop"
  | "rightCenter"
  | "rightBottom"
  | "bottomLeft"
  | "bottomRight"
  | "bottomCenter";

export interface CustomIndicatorProps {
  customIndicator?: boolean;
  dotActiveLine?: boolean;
  indicatorType?: IndicatorType;
  indicatorPosition?: IndicatorPosition;
  wrapperClassName?: string;
}

interface IndicatorProps extends StandardProps {
  current: number;
  data: BaseObject[];
  dotActiveLine?: boolean;
  wrapperClassName?: string;
  indicatorType?: IndicatorType;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  indicatorPosition?: IndicatorPosition;
}

interface ExtendSwiperItemPropsWithData extends ExtendSwiperItemProps {
  data: BaseObject;
}

const IndicatorDots = (props: IndicatorProps) => {
  const {
    data,
    style,
    current,
    className,
    dotActiveLine,
    indicatorColor,
    wrapperClassName,
    indicatorActiveColor,
    ...restProps
  } = props;
  return (
    <View className={wrapperClassName}>
      {data.map((__, index) => {
        const isCurrent: boolean = index === current;
        const _style = mergeStyle(style, {
          backgroundColor: isCurrent ? indicatorActiveColor : indicatorColor,
        });
        return (
          <View
            {...restProps}
            key={index}
            style={_style}
            className={`__dot__ ${
              isCurrent
                ? `__dot__active__ ${
                    dotActiveLine ? "__dot__active__line__" : ""
                  }`
                : ""
            } ${className ?? ""}`}
          ></View>
        );
      })}
    </View>
  );
};
const IndicatorNumber = (props: IndicatorProps) => {
  const { data, current, className, wrapperClassName, ...restProps } = props;
  const extraText = _.get(data, `[${current}]._text`, "");
  return (
    <View className={wrapperClassName}>
      <View {...restProps} className={`__numbers__ ${className ?? ""}`}>
        <Text>
          {current + 1}/{data.length}
        </Text>
        {extraText.length > 0 && (
          <Text className="__extra__text__">{extraText}</Text>
        )}
      </View>
    </View>
  );
};
const defaultIndicator = {
  indicatorType: "dots",
  indicatorPosition: "bottomCenter",
  indicatorColor: "rgba(0, 0, 0, .3)",
  indicatorActiveColor: "#000000",
};
const Indicator = (props: IndicatorProps) => {
  const {
    indicatorType,
    indicatorPosition,
    wrapperClassName = "",
    ...restProps
  } = {
    ...defaultIndicator,
    ...compactUndefined(props),
  };
  const IndicatorComponent = _.get(
    {
      dots: IndicatorDots,
      numbers: IndicatorNumber,
    },
    indicatorType,
    IndicatorDots
  );
  return (
    <IndicatorComponent
      {...restProps}
      wrapperClassName={`__indicator__ __indicator__${indicatorPosition} ${wrapperClassName}`}
    />
  );
};

const CarouselItem = (props: ExtendSwiperItemPropsWithData) => {
  const { data, onClick, extra, className = "", style, ...restProps } = props;
  const { src } = data || {};
  return (
    <SwiperItem
      {...restProps}
      key={data.id}
      className={`__swiper__item__ ${className}`}
      onClick={onClick?.bind(null, data)}
    >
      <View className="__content__">
        <Image
          src={src}
          mode="aspectFit"
          errorIcon="icon-error_img"
          className="__carousel__img__"
        />
      </View>
      {extra?.(data)}
    </SwiperItem>
  );
};

export interface ExtendSwiperProps extends CustomIndicatorProps, SwiperProps {}

export interface ExtendSwiperItemProps extends SwiperItemProps {
  extra?: (data?: BaseObject) => React.ReactElement;
}
export type CarouselData = BaseObject[];
export interface CarouselProps {
  data: CarouselData;
  style?: React.CSSProperties | string;
  className?: string;
  children?: React.ReactElement;
  swiperProps?: ExtendSwiperProps;
  swiperItemProps?: ExtendSwiperItemProps;
  extra?: React.ReactElement;
}
const Carousel = (props: CarouselProps) => {
  const {
    data,
    style = "",
    className = "",
    swiperProps = {},
    swiperItemProps,
  } = props;
  const {
    onChange,
    customIndicator,
    onClick,
    dotActiveLine,
    wrapperClassName,
    indicatorType,
    indicatorPosition,
    ...restProps
  } = swiperProps;
  const carouselData = (!isEmpty(data) ? data : [{}]) as CarouselData;
  const [current, setCurrent] = useState(swiperProps?.current ?? 0);
  const onSwiperChange = (eve) => {
    setCurrent(eve.detail.current);
    onChange?.call(null, eve);
  };
  return (
    <View className={`__carousel__ ${className}`} style={style}>
      <Swiper
        {...restProps}
        current={current}
        onChange={onSwiperChange}
        indicatorDots={!customIndicator && carouselData.length > 1}
        className={`__swiper__ ${swiperProps?.className ?? ""}`}
      >
        {carouselData.map((item, index) => (
          <CarouselItem
            {...swiperItemProps}
            key={index}
            data={item}
            onClick={onClick}
          />
        ))}
      </Swiper>
      {props?.extra}
      {props?.children}
      {!!(customIndicator && carouselData.length > 1) && (
        <Indicator
          {...{
            current,
            dotActiveLine,
            indicatorType,
            wrapperClassName,
            indicatorPosition,
            data: carouselData,
            indicatorColor: swiperProps?.indicatorColor,
            indicatorActiveColor: swiperProps?.indicatorActiveColor,
          }}
        />
      )}
    </View>
  );
};

export default Carousel;
