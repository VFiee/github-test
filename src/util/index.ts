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
