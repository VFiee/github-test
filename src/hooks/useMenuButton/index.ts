import { useRef, useState } from "react";
import { get } from "lodash";
import { getMenuButtonBoundingClientRect } from "@tarojs/taro";
import { BaseObject } from "@Components/type";
import useMount from "../useMount";
import useSystemInfo from "../useSystemInfo";

export type navigationBarTextStyle = "black" | "white";

type menuProps = {
  type?: navigationBarTextStyle;
};

type menuData = {
  rect: BaseObject;
  wrapStyle?: BaseObject;
  menuStyle?: BaseObject;
  splitLineStyle?: BaseObject;
};

const useMenuButton = (props?: menuProps): menuData => {
  const { type: typeStyle = "white" } = props || {};
  const rectRef = useRef(getMenuButtonBoundingClientRect());
  const systemInfo = useSystemInfo();
  const [style, setStyle] = useState({});
  useMount(() => {
    if (rectRef.current != null) {
      const { width, height, top, right } = rectRef.current;
      const { screenWidth, statusBarHeight } = systemInfo;
      const borderColor = (type: navigationBarTextStyle): string => {
        return get(
          {
            black: `rgba(0,0,0,0.1)`,
            white: `rgba(255,255,255,0.25)`,
          },
          type,
          `rgba(255,255,255,0.25)`
        );
      };
      const backgroundColor = (type: navigationBarTextStyle): string => {
        return get(
          {
            black: "rgba(252,252,252,0.6)",
            white: "rgba(0,0,0,0.15)",
          },
          type,
          `rgba(0,0,0,0.15)`
        );
      };
      const splitLineBackgroundColor = (
        type: navigationBarTextStyle
      ): string => {
        return get(
          {
            black: "rgba(0,0,0,0.1)",
            white: "rgba(255,255,255,0.3)",
          },
          type,
          "rgba(252,252,252,0.3)"
        );
      };
      setStyle({
        wrapStyle: {
          position: "fixed",
          zIndex: 1000,
          boxSizing: "border-box",
          width: screenWidth + "px",
          paddingTop: statusBarHeight + "px",
          paddingLeft: screenWidth - right + "px",
          paddingRight: screenWidth - right + "px",
          height: `${
            height + statusBarHeight + (top - statusBarHeight + 2) * 2
          }px`,
        },
        menuStyle: {
          boxSizing: "border-box",
          width: width + `px`,
          height: height + `px`,
          borderRadius: height / 2 + `px`,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: borderColor(typeStyle),
          backgroundColor: backgroundColor(typeStyle),
        },
        splitLineStyle: {
          width: `1px`,
          height: "18px",
          backgroundColor: splitLineBackgroundColor(typeStyle),
        },
      });
    }
  });
  return {
    rect: rectRef.current,
    ...style,
  };
};

export default useMenuButton;
