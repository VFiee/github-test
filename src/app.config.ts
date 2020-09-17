export default {
  pages: [
    "pages/index/index",
    "pages/appbar/index",
    "pages/authorize/index",
    "pages/carousel/index",
    "pages/cell/index",
    "pages/divider/index",
    "pages/empty/index",
    "pages/icon/index",
    "pages/image/index",
    "pages/loading/index",
    "pages/overlay/index",
    "pages/transition/index",
    "pages/field/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于为您提供对应城市的房源服务",
    },
  },
};
