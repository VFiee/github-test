import React from "react";
import { CoverView } from "@tarojs/components";
import Icon, { IconProps } from "@Components/icon";
import { ViewProps } from "@tarojs/components/types/View";
import useMenuButton, { navigationBarTextStyle } from "@Hooks/useMenuButton";
import {
  getCurrPages,
  goToHome,
  navigateBack,
  mergeStyle,
  getImageUrl,
} from "@Util/index";
// 图片
// import BackBlack from "./icons/back-black-icon.png";
// import BackWhite from "./icons/back-white-icon.png";
// import HomeBlack from "./icons/home-black-icon.png";
// import HomeWhite from "./icons/home-white-icon.png";
// import MenuBlack from "./icons/menu-black-icon.png";
// import MenuWhite from "./icons/menu-white-icon.png";

import "./index.less";

export interface leftIconProps extends ViewProps {
  home?: IconProps;
  back?: IconProps;
}

export interface RightIconProps extends ViewProps {
  icon?: IconProps;
}

export interface TitleProps extends ViewProps {
  text?: string;
}

export interface NavigationBarProps extends ViewProps {
  title?: string | TitleProps;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  type?: navigationBarTextStyle;
  left?: Function | leftIconProps;
  middle?: Function | ViewProps;
  right?: Function | RightIconProps;
}
const getMenuProps = (
  props: Function | leftIconProps | RightIconProps
): ViewProps | leftIconProps => {
  const isFn = typeof props === "function";
  return (isFn ? { onClick: props } : props) as ViewProps;
};

const getTitleProps = (props: string | TitleProps): TitleProps => {
  return typeof props === "string" ? { text: props } : props;
};
// const defaultMenuIcon: IconSrcProps = {
//   leftSrc: {
//     home: {
//       black: getImageUrl(`tab-home`),
//       white: getImageUrl(`tab-home-white`),
//     },
//     back: {
//       black: getImageUrl(`tab-back`),
//       white: getImageUrl(`tab-back-white`),
//     },
//   },
//   rightSrc: {
//     white: getImageUrl(`tab-menu-white`),
//     black: getImageUrl(`tab-menu`),
//   },
// };
const defaultNavigationBarProps = {
  title: "微信",
  type: "white",
  backgroundColor: "#ffffff",
  // statusBarBackgroundColor: "#ffffff",
  left: {
    home: {
      isCover: true,
      // localImage: true,
      type: `tab-home`,
      style: {
        width: "34rpx",
        height: "34rpx",
      },
      // type: "icon-home2",
      // size: "38rpx",
    },
    back: {
      isCover: true,
      localImage: true,
      type: `tab-back`,
      style: {
        width: "18rpx",
        height: "30rpx",
      },
      // type: "icon-back",
      // size: "42rpx",
    },
  },
  right: {
    icon: {
      isCover: true,
      localImage: true,
      type: `tab-menu`,
      style: {
        width: "34rpx",
        height: "25rpx",
      },
      // type: "icon-caidan7",
      // size: "48rpx",
    },
  },
};
// const iconTypeImage = {
//   white: {
//     home: HomeWhite,
//     back: BackWhite,
//     menu: MenuWhite,
//   },
//   black: {
//     home: HomeBlack,
//     back: BackBlack,
//     menu: MenuBlack,
//   },
// };

const NavigationBar = (props: NavigationBarProps) => {
  const {
    type,
    title,
    left,
    right,
    middle,
    backgroundColor,
    // statusBarBackgroundColor,
  } = {
    ...defaultNavigationBarProps,
    ...props,
  };
  const { rect, wrapStyle, menuStyle, delimiterStyle } = useMenuButton({
    type: type as navigationBarTextStyle,
  });
  const { width, height } = menuStyle;
  const { position, zIndex, ...restProps } = wrapStyle;
  let { isFirst: isHome, isTabBar } = getCurrPages();
  isHome = true;
  const {
    text,
    style: titleStyle,
    className: titleCls,
    ...restTitleProps
  } = getTitleProps(title || {});
  const {
    home,
    back,
    className: leftCls,
    onClick: onLeftMenuClick,
    ...restLeftProps
  } = getMenuProps(left) as leftIconProps;
  const {
    icon,
    className: rightCls,
    onClick: onRightMenuClick,
    ...restRightProps
  } = getMenuProps(right) as RightIconProps;
  const { className: delimiterCls, style: delimiterSty } = getMenuProps(
    middle ?? {}
  );
  const _iconProps = isHome ? home : back;
  const iconProps = {
    ..._iconProps,
    // type: iconTypeImage[type][isHome ? "home" : "back"],
    type: getImageUrl(
      // @ts-ignore
      type === "white" ? `${_iconProps?.type}-white` : _iconProps?.type
    ),
  } as IconProps;
  return (
    <React.Fragment>
      <CoverView
        style={{
          ...wrapStyle,
          backgroundColor,
        }}
        className="__appbar__"
      >
        <CoverView
          style={menuStyle}
          className={`__left__menu__ ${
            isTabBar ? "__left__menu__hidden__" : ""
          }`}
        >
          <CoverView
            {...restLeftProps}
            className={`__menu__item__wrap__ ${leftCls ?? ""}`}
            onClick={(eve) => {
              onLeftMenuClick?.call(
                null,
                { isHome, menuStyle, rect, props: left },
                eve
              );
              isHome ? goToHome() : navigateBack();
            }}
          >
            <Icon {...(iconProps as IconProps)} />
          </CoverView>
          <CoverView
            className={`__delimiter__ ${delimiterCls ?? ""}`}
            style={mergeStyle(delimiterStyle, delimiterSty)}
          />
          <CoverView
            {...restRightProps}
            className={`__menu__item__wrap__ ${rightCls ?? ""}`}
            onClick={(eve) => {
              onRightMenuClick?.call(
                null,
                { isHome, menuStyle, rect, props: right },
                eve
              );
            }}
          >
            <Icon
              {...{
                ...(icon as IconProps),
                // type: iconTypeImage[type]["menu"],
                type: getImageUrl(
                  // @ts-ignore
                  type === "white" ? `${icon?.type}-white` : icon?.type
                ),
                // color: type,
              }}
            />
          </CoverView>
        </CoverView>
        <CoverView
          {...restTitleProps}
          className={`__appbar__title__ ${titleCls ?? ""}`}
          style={mergeStyle(
            {
              color: backgroundColor === "#ffffff" ? "#333" : "#fff",
            },
            titleStyle
          )}
        >
          {text}
        </CoverView>
        <CoverView
          style={{ width, height }}
          className={`__right__menu__ ${
            isTabBar ? "__right__menu__hidden__" : ""
          }`}
        />
      </CoverView>
      <CoverView style={restProps} />
    </React.Fragment>
  );
};

NavigationBar.options = {
  addGlobalClass: true,
};

export default NavigationBar;
