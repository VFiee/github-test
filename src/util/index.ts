import qs from "qs";
import _ from "lodash";
import { BaseObject } from "@Types/index";

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

export const promiseify = (fn: (...args) => any, context: any = null) => (
  args = {}
): Promise<any> =>
  new Promise((resolve, reject) => {
    fn.bind(context)({
      ...args,
      fail: reject,
      success: resolve,
    });
  });

type RouterData = {
  url: string;
  query: string;
  params: BaseObject;
};
/**
 *
 * @param {string} url 获取参数的URL
 * @param {BaseObject} params 追加的参数对象
 * @returns {RouterData} 返回一个包含[无参数URL字符串]和[拼接参数字符串]以及[参数对象]的对象
 */
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
