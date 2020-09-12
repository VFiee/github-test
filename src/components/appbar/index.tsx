import React from "react";
import { CoverView } from "@tarojs/components";
import Icon, { IconProps } from "@Components/icon";
import { ViewProps } from "@tarojs/components/types/View";
import useMenuButton, { navigationBarTextStyle } from "@Hooks/useMenuButton";
import { getCurrPages, goToHome, navigateBack, mergeStyle } from "@Util/index";
// 图片
import BackBlack from "./icons/back-black-icon.png";
import BackWhite from "./icons/back-white-icon.png";
import HomeBlack from "./icons/home-black-icon.png";
import HomeWhite from "./icons/home-white-icon.png";
import MenuBlack from "./icons/menu-black-icon.png";
import MenuWhite from "./icons/menu-white-icon.png";

import "./index.less";

export interface MenuIcon {
  white?: IconProps;
  black?: IconProps;
}

export interface leftIconProps extends ViewProps {
  home?: MenuIcon;
  back?: MenuIcon;
}

export interface RightIconProps extends ViewProps {
  menu?: MenuIcon;
}

export interface TitleProps extends ViewProps {
  text?: string;
}

export interface NavigationBarProps extends ViewProps {
  title?: string | TitleProps;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  type?: navigationBarTextStyle;
  left?: leftIconProps;
  middle?: ViewProps;
  right?: RightIconProps;
  onTitleClick?: Function;
  onLeftClick?: Function;
  onRightClick?: Function;
}

const getTitleProps = (props: string | TitleProps): TitleProps => {
  return typeof props === "string" ? { text: props } : props;
};
const defaultHomeIconProps = {
  isCover: true,
  localImage: true,
  style: {
    width: "34rpx",
    height: "34rpx",
  },
};
const defaultBackIconProps = {
  isCover: true,
  localImage: true,
  style: {
    width: "18rpx",
    height: "30rpx",
  },
};
const defaultMenuIconProps = {
  isCover: true,
  localImage: true,
  style: {
    width: "34rpx",
    height: "25rpx",
  },
};
const defaultNavigationBarProps: NavigationBarProps = {
  title: "微信",
  type: "white",
  backgroundColor: "#ffffff",
  // statusBarBackgroundColor: "#ffffff",
  left: {
    home: {
      white: {
        ...defaultHomeIconProps,
        type: HomeWhite,
      },
      black: {
        ...defaultHomeIconProps,
        type: HomeBlack,
      },
    },
    back: {
      white: {
        ...defaultBackIconProps,
        type: BackWhite,
      },
      black: {
        ...defaultBackIconProps,
        type: BackBlack,
      },
    },
  },
  right: {
    menu: {
      white: {
        ...defaultMenuIconProps,
        type: MenuWhite,
      },
      black: {
        ...defaultMenuIconProps,
        type: MenuBlack,
      },
    },
  },
  onLeftClick: ({ isHome }) => {
    isHome ? goToHome() : navigateBack();
  },
};

const AppBar = (props: NavigationBarProps) => {
  const {
    type,
    title,
    left,
    right,
    middle,
    backgroundColor,
    onTitleClick,
    onLeftClick,
    onRightClick,
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
    ...restLeftProps
  } = left as leftIconProps;
  const {
    menu,
    className: rightCls,
    ...restRightProps
  } = right as RightIconProps;
  const { className: delimiterCls, style: delimiterSty } = (middle ??
    {}) as TitleProps;
  const leftIconProps = isHome ? home : back;
  const menuClickProps = { isHome, menuStyle, rect, props: left };
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
            onClick={(eve) => onLeftClick?.(menuClickProps, eve)}
          >
            <Icon
              {...(leftIconProps?.[
                type as navigationBarTextStyle
              ] as IconProps)}
            />
          </CoverView>
          <CoverView
            className={`__delimiter__ ${delimiterCls ?? ""}`}
            style={mergeStyle(delimiterStyle, delimiterSty)}
          />
          <CoverView
            {...restRightProps}
            className={`__menu__item__wrap__ ${rightCls ?? ""}`}
            onClick={(eve) => onRightClick?.(menuClickProps, eve)}
          >
            <Icon {...(menu?.[type as navigationBarTextStyle] as IconProps)} />
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
          onClick={(eve) => onTitleClick?.(eve)}
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

AppBar.options = {
  addGlobalClass: true,
};

export default AppBar;
