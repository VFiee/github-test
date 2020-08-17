/**
 * @param {any} target 检测的值
 * @returns {boolean} 返回布尔值,`true`表示是数组,`false`表示不是数组
 *
 */
export const isArray = Array.isArray;

/**
 * 获取任意值的字符串类型
 * @param {any} value 转换为字符串的数据
 * @returns {string} 返回 Object.prototype.toString.call(value) 的值
 *
 */
export const toString = (value: any): string =>
  Object.prototype.toString.call(value);

/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回 value的数据类型,如 string object function null undefined number ....
 *
 */
export const getTypeof = (value: any): string => {
  return toString(value).slice(8, -1);
};

/**
 * 判断当前值是否为对象
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
export const isObject = (value: any): boolean => {
  return value != null && typeof value === "object";
};

/**
 * 检测当前值是否为Map类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isMap = (value: any): boolean => getTypeof(value) === "Map";

/**
 * 检测当前值是否为WeakMap类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isWeakMap = (value: any): boolean =>
  getTypeof(value) === "WeakMap";

/**
 * 检测当前值是否为Set类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isSet = (value: any): boolean => getTypeof(value) === "Set";

/**
 * 检测当前值是否为WeakSet类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isWeakSet = (value: any): boolean =>
  getTypeof(value) === "WeakSet";

/**
 * 检测当前值是否为Function类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isFunction = (value: any): boolean =>
  getTypeof(value) === "Function";

/**
 * 检测当前值是否为GeneratorFunction类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isGeneratorFunction = (value: any): boolean =>
  getTypeof(value) === "GeneratorFunction";

/**
 * 检测当前值是否为Promise类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isPromise = (value: any): boolean =>
  getTypeof(value) === "Promise";

/**
 * 检测当前值是否为RegExp类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isRegExp = (value: any): boolean => getTypeof(value) === "RegExp";
