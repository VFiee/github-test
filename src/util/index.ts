import { createSelectorQuery } from "@tarojs/taro";
import qs from "qs";
import _ from "lodash";
import { BaseObject, BaseMap } from "@Types/index";
import { getSystemInfoSync } from "./system";
import { isObject } from "./lodash";

export * from "./lodash";

export * from "./system";

export * from "./style";

/**
 * 获取七牛云图片地址
 * @param {string} name 图片名称
 * @returns {string} 完整七牛云图片地址
 *
 */
export const getImageUrl = (name: string): string =>
  `https://file.zhen22.com/weapp/${name}.png`;

/**
 * 代理fn,并返回一个Promise
 * @param {funciton} fn 需要promise化的函数
 * @param {any} args 传递给fn的参数
 * @returns {Promise} 返回promise
 */

export const promiseify = (fn: Function): any => (args = {}): Promise<any> =>
  new Promise((resolve, reject) => {
    fn({
      ...args,
      fail: reject,
      success: resolve,
    });
  });

/**
 *
 * @param {string} url 获取参数的URL
 * @param {BaseObject} params 追加的参数对象
 * @returns {RouterData} 返回一个包含[无参数URL字符串]和[拼接参数字符串]以及[参数对象]的对象
 */
type RouterData = {
  url: string;
  query: string;
  params: BaseObject;
};
export const getRouterParams = (
  url: string,
  params: BaseObject = {}
): RouterData => {
  if (typeof url !== "string" || url == "") return { url, params, query: "" };
  const [baseUrl, query] = decodeURIComponent(url).split("?");
  const mergeParams = {
    ...qs.parse(query),
    ...params,
  };
  return {
    url: baseUrl,
    params: mergeParams,
    query: qs.stringify(mergeParams),
  };
};

/**
 *
 * @param {BaseObject} params 小程序 this.$router.params对象
 * @returns {BaseObject} 解析小程序路由参数,二维码扫描参数q,小程序码扫码参数scene
 * 其中 scene 字符串传参格式应为 key=value&key2=value2 格式
 *
 */
export const getMiniParams = (params: BaseObject): BaseObject => {
  if (_.isEmpty(params)) return {};
  const { q = "", scene = "", ...restParams } = params;
  return {
    ...restParams,
    ...qs.parse(decodeURIComponent(q)),
    ...qs.parse(decodeURIComponent(scene)),
  };
};

/**
 * 将对象转换成Map
 * @param {object} obj 转换成Map的原始对象
 * @param {BaseMap} initMap 初始Map对象,如果存在将在初始Map对象上增加属性,属性存在则覆盖
 * @returns {BaseMap} 返回转换后的Map对象
 *
 */
export const objectToMap = (obj: BaseObject, initMap?: BaseMap): BaseMap => {
  initMap = initMap || new Map();
  if (!isObject(obj)) return initMap;
  const keys = Object.keys(obj);
  if (keys.length === 0) return initMap;
  for (let i = 0, len = keys.length; i < len; i++) {
    initMap.set(keys[i], obj[keys[i]]);
  }
  return initMap;
};

/**
 * 将Map转换成对象
 * @param {BaseMap} map 转换成对象的Map
 * @param {object} initObj 初始对象,如果存在将在初始对象上增加属性,属性存在则覆盖
 * @returns {BaseMap} 返回转换后的Map对象
 *
 */
export const mapToObject = (map: BaseMap, initObj?: BaseObject): BaseObject => {
  let res: BaseObject = initObj || {};
  if (!(map instanceof Map) || map.size === 0) return res;
  map.forEach((value, key) => {
    res[key] = value;
  });
  return res;
};

/**
 * 下一次页面渲染前执行的方法
 * @param {Function} fn 执行的方法
 *
 */
export const nextTick = (fn: Function) => {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
};

/**
 * 小程序中模拟requestAnimationFrame
 * @param {Function} cb 回调函数
 *
 */
export function requestAnimationFrame(cb: Function) {
  const _systemInfo = getSystemInfoSync();
  if (_systemInfo.platform === "devtools") {
    return nextTick(cb);
  }
  return createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb();
    });
}
