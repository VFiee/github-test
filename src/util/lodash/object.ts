import { isArray, isObject } from "./index";
/**
 * 过滤掉目标对象中的被Boolean转为false的值
 * @param { [] | object } value
 * @param {(arg: any) => boolean} fn 每次过滤执行的函数
 * @returns { [] | object } 返回过滤后的值
 */

export function compact(
  value: [] | object,
  fn?: (arg: any) => boolean
): [] | object {
  if (isArray(value)) {
    return value.filter(fn || Boolean);
  }
  if (!isObject(value)) return value;
  let keys = Object.keys(value);
  if (keys.length <= 0) return value;
  let res = {};
  for (let i = 0, len = keys.length; i < len; i++) {
    let item = value[keys[i]];
    if (isArray(item) || isObject(item)) {
      res[keys[i]] = compact(item, fn);
    } else if (!!item) {
      res[keys[i]] = item;
    }
  }
  return res;
}
