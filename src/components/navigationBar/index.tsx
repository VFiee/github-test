import React, { CSSProperties } from "react";
import { get } from "lodash";
import { CoverView, CoverImage, Block } from "@tarojs/components";
import { ViewProps } from "@tarojs/components/types/View";
import useMenuButton, { navigationBarTextStyle } from "@Hooks/useMenuButton";
import { getImageUrl } from "@Util/index";
import { getCurrPages, goToHome, navigateBack } from "@Util/system";
import "./index.less";

export type IconSrc = {
  white: string;
  black: string;
};

export interface BaseProps extends ViewProps {
  style?: CSSProperties;
  src?: IconSrc;
}

type LeftIconProps = {
  back?: IconSrc;
  home?: IconSrc;
};

export interface LeftPorps extends ViewProps {
  style?: CSSProperties;
  src?: LeftIconProps;
}

export interface TitleProps extends BaseProps {
  text?: string;
}

export type MenuClickEvent = (...args) => any;

export interface NavigationBarProps extends ViewProps {
  title?: string | TitleProps;
  type?: navigationBarTextStyle;
  backgroundColor?: string;
  left?: MenuClickEvent | LeftPorps;
  middle?: MenuClickEvent | BaseProps;
  right?: MenuClickEvent | BaseProps;
}
const getMenuPorps = (
  props: MenuClickEvent | LeftPorps | BaseProps
): BaseProps | LeftPorps => {
  const isFn = typeof props === "function";
  return (isFn ? { onClick: props } : props) as BaseProps;
};

const getTitlePorps = (props: string | TitleProps): TitleProps => {
  return typeof props === "string" ? { text: props } : props;
};

type IconSrcData = {
  isHome: boolean;
  leftSrc: string;
  rightSrc: string;
};
type IconSrcProps = {
  leftSrc: LeftIconProps;
  rightSrc: IconSrc;
};

const defaultTitle: string = "真二网";

const defaultMenuIcon: IconSrcProps = {
  leftSrc: {
    home: {
      black: getImageUrl(`tab-home`),
      white: getImageUrl(`tab-home-white`),
    },
    back: {
      black: getImageUrl(`tab-back`),
      white: getImageUrl(`tab-back-white`),
    },
  },
  rightSrc: {
    white: getImageUrl(`tab-menu-white`),
    black: getImageUrl(`tab-menu`),
  },
};

const getMenuIconSrc = (
  type: navigationBarTextStyle,
  props: IconSrcProps
): IconSrcData => {
  const { leftSrc = {}, rightSrc = {} } = props;
  const { isRootPage, isFirst } = getCurrPages();
  const isHome = isRootPage || isFirst;
  const srcData = {
    left: isHome
      ? { ...defaultMenuIcon.leftSrc.home, ...leftSrc?.home }
      : { ...defaultMenuIcon.leftSrc.back, ...leftSrc?.back },
    right: {
      ...defaultMenuIcon.rightSrc,
      ...rightSrc,
    },
  };
  return {
    isHome,
    leftSrc: get(srcData, `left.${type}`),
    rightSrc: get(srcData, `right.${type}`),
  };
};
const NavigationBar = (props: NavigationBarProps) => {
  const { type = "white", backgroundColor, title, left, right, middle } = props;
  const {
    rect,
    wrapStyle = {},
    menuStyle = {},
    splitLineStyle = {},
  } = useMenuButton({ type });
  const { width, height } = menuStyle;
  const { position, zIndex, ...restProps } = wrapStyle;
  const {
    style = {},
    className = "",
    text = defaultTitle,
    ...restTitleProps
  } = getTitlePorps(title || {});
  const {
    className: leftCls = "",
    src: leftIconSrc,
    onClick: onLefeMenuClick,
    ...restLeftProps
  } = getMenuPorps(left || {});
  const {
    className: rightCls = "",
    src: rightIconSrc,
    onClick: onRightMenuClick,
    ...restRightProps
  } = getMenuPorps(right || {});
  const { className: midCls = "", style: midStyle = {} } = getMenuPorps(
    middle || {}
  );
  const { isHome, leftSrc, rightSrc } = getMenuIconSrc(type, {
    leftSrc: leftIconSrc as LeftIconProps,
    rightSrc: rightIconSrc as IconSrc,
  });
  return (
    <Block>
      <CoverView
        style={{
          ...wrapStyle,
          backgroundColor,
        }}
        className="_appbar_wrapper"
      >
        <CoverView style={menuStyle} className="_menu_bar">
          <CoverView
            {...restLeftProps}
            className={`_menu_img_wrap ${leftCls}`}
            onClick={(eve) => {
              isHome ? goToHome() : navigateBack();
              onLefeMenuClick?.call(
                null,
                { isHome, menuStyle, rect, props: left },
                eve
              );
            }}
          >
            <CoverImage
              src={leftSrc}
              className={`_menu_icon ${isHome ? "home" : "back"}`}
            />
          </CoverView>
          <CoverView
            className={`_menu_split_line ${midCls}`}
            style={{
              ...splitLineStyle,
              ...midStyle,
            }}
          />
          <CoverView
            {...restRightProps}
            onClick={(eve) => {
              onRightMenuClick?.call(
                null,
                { isHome, menuStyle, rect, props: right },
                eve
              );
            }}
            className={`_menu_img_wrap ${rightCls}`}
          >
            <CoverImage src={rightSrc} className={`_menu_icon menu ${type}`} />
          </CoverView>
        </CoverView>
        <CoverView
          {...restTitleProps}
          className={`_appbar_title ${className}`}
          style={{
            color: type === "white" ? "#fff" : "#333",
            ...style,
          }}
        >
          {text}
        </CoverView>
        <CoverView style={{ width, height }} className="_appbar_right" />
      </CoverView>
      <CoverView style={restProps} />
    </Block>
  );
};

export default NavigationBar;
