import React, { ReactElement, useState } from "react";
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
import EImage from "@Components/image";
import { BaseObject } from "@Components/type";
import { getImageUrl } from "@Util/index";
import "./index.less";

export type IndicatorType = "dots" | "numbers";

export type CarouselData = BaseObject[];

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

export interface ExtendSwiperProps extends CustomIndicatorProps, SwiperProps {}

export interface ExtendSwiperItemProps extends SwiperItemProps {
  extra?: (...args) => ReactElement;
}

interface ExtendSwiperItemPropsWithData extends ExtendSwiperItemProps {
  data: BaseObject;
}

export interface CarouselProps {
  data?: CarouselData;
  children?: ReactElement;
  swiperPorps?: ExtendSwiperProps;
  swiperItemProps?: ExtendSwiperItemProps;
  extra?: (...args) => ReactElement;
}

const IndicatorDots = (props: IndicatorProps) => {
  const {
    data,
    current,
    style = {},
    wrapperClassName,
    className = "",
    dotActiveLine,
    indicatorActiveColor,
    indicatorColor,
    ...restProps
  } = props;
  return (
    <View className={wrapperClassName}>
      {data.map((_, index) => {
        const isCurrent: boolean = index === current;
        const mergeStyle = {
          ...(style as React.CSSProperties),
          backgroundColor: isCurrent ? indicatorActiveColor : indicatorColor,
        };
        return (
          <View
            {...restProps}
            key={index}
            style={mergeStyle}
            className={`_dot ${
              isCurrent && dotActiveLine ? "_dot_active_line" : ""
            } ${className}`}
          ></View>
        );
      })}
    </View>
  );
};
const IndicatorNumber = (props: IndicatorProps) => {
  const {
    data,
    current,
    wrapperClassName,
    className = "",
    ...restProps
  } = props;
  const extraText = _.get(data, `[${current}].__text`, "");
  return (
    <View className={wrapperClassName}>
      <View {...restProps} className={`_numbers ${className}`}>
        <Text>
          {current + 1}/{data.length}
        </Text>
        {!!extraText && (
          <Text className="_numbers_extra_text">{extraText}</Text>
        )}
      </View>
    </View>
  );
};

const Indicator = (props: IndicatorProps) => {
  const {
    indicatorType = "dots",
    indicatorPosition = "bottomCenter",
    indicatorActiveColor,
    indicatorColor,
    ...restProps
  } = props;
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
      indicatorColor={indicatorColor || "rgba(0, 0, 0, .3)"}
      indicatorActiveColor={indicatorActiveColor || "#000000"}
      wrapperClassName={`_indicator ${indicatorPosition}`}
    />
  );
};

const CarouselItem = (props: ExtendSwiperItemPropsWithData) => {
  const { data, onClick, extra, ...restProps } = props;
  const { src } = data || {};
  return (
    <SwiperItem {...restProps} onClick={onClick?.bind(null, data)}>
      <View className="_content">
        <EImage
          src={src}
          mode="aspectFit"
          className="_carousel_img"
          errorSrc={getImageUrl("lunbo")}
        />
      </View>
      {!!extra && extra(data)}
    </SwiperItem>
  );
};

const Carousel = (props: CarouselProps) => {
  const {
    extra,
    data,
    children,
    swiperPorps = {},
    swiperItemProps = {},
  } = props;
  const {
    onClick,
    className = "",
    indicatorType,
    customIndicator,
    dotActiveLine,
    indicatorPosition,
    indicatorColor,
    indicatorActiveColor,
    onChange,
    onTransition,
    onAnimationFinish,
    ...restProps
  } = swiperPorps;
  const fnProps = { onChange, onTransition, onAnimationFinish };
  const carouselData = (!_.isEmpty(data) ? data : [{}]) as CarouselData;
  const [current, setCurrent] = useState(swiperPorps?.current || 0);
  const indicatorProps = {
    current,
    indicatorType,
    customIndicator,
    dotActiveLine,
    indicatorPosition,
    indicatorColor,
    indicatorActiveColor,
    data: carouselData,
  };
  const onSwiperChange = (eve) => {
    setCurrent(eve.detail.current);
    onChange?.call(null, eve);
  };
  return (
    <View className="_swiper-wrap">
      <Swiper
        {...fnProps}
        {...restProps}
        onChange={onSwiperChange}
        indicatorColor={indicatorColor}
        indicatorDots={!customIndicator}
        className={`_carousel ${className}`}
        indicatorActiveColor={indicatorActiveColor}
      >
        {carouselData.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              {...swiperItemProps}
              data={item}
              onClick={onClick}
            />
          );
        })}
      </Swiper>
      {!!extra &&
        extra({
          data,
          ...fnProps,
        })}
      {!!children && children}
      {!!customIndicator && carouselData.length > 1 && (
        <Indicator {...indicatorProps} />
      )}
    </View>
  );
};

export default Carousel;
