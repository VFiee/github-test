import { BaseObject } from "@/types";
import { isEmpty, isFunction } from "./base";
import { isArray, isObject, hasOwnProperty } from "./index";
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
  const predicate = fn || Boolean;
  if (isArray(value)) {
    return value.filter(predicate);
  }
  if (!isObject(value)) return value;
  let keys = Object.keys(value);
  if (keys.length <= 0) return value;
  let res = {};
  for (let i = 0, len = keys.length; i < len; i++) {
    let item = value[keys[i]];
    if (isArray(item) || isObject(item)) {
      res[keys[i]] = compact(item, fn);
    } else if (!predicate(item)) {
      res[keys[i]] = item;
    }
  }
  return res;
}

/**
 *
 * 遍历对象并返回对象可枚举属性组成的数组
 * @param {object} value 遍历对象
 * @returns {string[]} 返回对象的自身可枚举属性组成的数组
 *
 */

export const keys = Object.keys;

/**
 * 遍历对象并返回对象可枚举属性值组成的数组
 * @param {object} value 遍历对象
 * @returns {any[]} 返回对象的自身可枚举属性值组成的数组
 *
 */
export const values = Object.values;

/**
 *
 * @param value 检索的对象
 * @param callback 循环时每个元素的回调
 * @param thisArg 回调函数作用域
 */

export type ForEachCallback<T = BaseObject | any[]> = (
  value: any,
  key?: number,
  target?: T
) => any;
export const forEach = (
  value: BaseObject | any[],
  callback: ForEachCallback,
  thisArg?: any
) => {
  if (isArray(value)) {
    return value.forEach(callback, thisArg);
  } else if (isObject(value) && keys(value).length > 0) {
    return foreachObject(value, callback, thisArg);
  }
};

/**
 * 遍历对象并执行回调
 * @param {BaseObject} object 遍历的对象
 * @param {ForEachCallback} callback 遍历执行的回调函数
 * @param {any} thisArg 回调函数作用域
 */
export const foreachObject = (
  object: BaseObject,
  callback: ForEachCallback,
  thisArg: any
) => {
  for (const key in object) {
    if (hasOwnProperty.call(object, key)) {
      callback.call(thisArg, object[key], key, object);
    }
  }
};

/**
 * 创建一个从object中选取属性的对象
 * @param {object} object 来源对象
 * @param {string | string[] | predicate } props 需要获取的属性或自定义是否获取,
 * 返回true则获取,false则忽略
 * @returns {object} 返回新对象
 *
 */

type predicate = (value: string, key: string | number) => boolean;
export function pick(object: BaseObject, props: string | string[] | predicate) {
  let res: BaseObject = {};
  if (isEmpty(object)) return res;
  if (typeof props === "string") {
    return hasOwnProperty.call(object, props)
      ? { [props]: object[props] }
      : res;
  } else if (isArray(props) && props.length > 0) {
    forEach(props, (value) => {
      if (hasOwnProperty.call(object, value)) {
        res[value] = object[value];
      }
    });
  } else if (isFunction(props)) {
    forEach(object, (value, key) => {
      if ((props as Function)(value, key)) {
        res[value] = object[value];
      }
    });
  }
  return res;
}

type MergeProps = {
  object: BaseObject;
  source: BaseObject;
};
export function merge(
  { object, source }: MergeProps,
  isDeep: boolean = false
): BaseObject {
  if (!isDeep) {
    return Object.assign({}, object, source);
  }
  let res = {};
  for (const key in object) {
    if (hasOwnProperty.call(object, key)) {
      if (hasOwnProperty.call(source, key)) {
        if (isObject(object[key]) && isObject(source[key])) {
          res[key] = merge(
            { object: object[key], source: source[key] },
            isDeep
          );
        }
        res[key] = source[key];
      }
      res[key] = object[key];
    }
  }
  return res;
}
