import { getSystemInfoSync as _getSystemInfoSync } from "@tarojs/taro";

export * from "./route";

export * from "./setting";

/**
 * 获取系统信息
 * @returns {Taro.getSystemInfoSync.Result} 当前设备系统信息
 */
let systemInfo: Taro.getSystemInfoSync.Result;
export const getSystemInfoSync = () => {
  if (systemInfo == null) {
    systemInfo = _getSystemInfoSync();
  }
  return systemInfo;
};
