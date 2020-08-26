const objectProto = Object.prototype;

/**
 * @param {any} target 检测的值
 * @returns {boolean} 返回布尔值,`true`表示是数组,`false`表示不是数组
 *
 */
export const isArray = Array.isArray;

/**
 * 检测当前值是否为buffer类型
 * @params {any} value 检测的值
 * @returns {boolean} 返回boolean
 *
 */
export const isBuffer = Buffer ? Buffer.isBuffer : (_value: any) => false;

/**
 * 获取任意值的字符串类型
 * @param {any} value 转换为字符串的数据
 * @returns {string} 返回 Object.prototype.toString.call(value) 的值
 *
 */
export const toString = (value: any): string =>
  objectProto.toString.call(value);

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
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
export const isNull = (value: any): boolean => value === null;

/**
 *
 * @param {any} value 任意合法值
 * @returns {string} 返回boolean
 *
 */
export const isUndefined = (value: any): boolean =>
  typeof value === "undefined";

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

/**
 * 检测当前值是否为Boolean类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
export const isBoolean = (value: any): boolean =>
  typeof value === "boolean" || getTypeof(value) === "Boolean";

/**
 * 检测当前值是否为Arguments类型
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 */
export const isArguments = (value: any): boolean => {
  return (
    isObject(value) &&
    objectProto.hasOwnProperty.call(value, "callee") &&
    objectProto.propertyIsEnumerable("callee") &&
    isFunction(value.callee)
  );
};

/**
 * 检测当前值是否为空
 * @param {any} value 任意合法值
 * @returns {boolean} 返回boolean
 *
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true;
  if (
    typeof value === "string" ||
    isArray(value) ||
    isBuffer(value) ||
    isArguments(value)
  ) {
    return !value.length;
  }
  if (isSet(value) || isMap(value)) {
    return !value.size;
  }
  for (const key in value) {
    if (objectProto.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
};
