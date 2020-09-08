import React from "react";
import { login } from "@tarojs/taro";
import { Button, StandardProps } from "@tarojs/components";
import { isFunction, isPromise, ensureAuthScope, AuthScope } from "@Util/index";
import "./index.less";

type PromiseFn = (args?: any) => Promise<any>;

type ObjectService = {
  params: object;
  fn: PromiseFn;
  needMiniCode?: boolean;
  codeKey?: string;
};

type AuthorizeService = PromiseFn | ObjectService;

type OpenType =
  | "contact"
  | "getPhoneNumber"
  | "getUserInfo"
  | "launchApp"
  | "scope";

export interface AuthorizeProps extends StandardProps {
  authorize: boolean;
  openType?: OpenType;
  authScope?: AuthScope;
  children?: React.ReactElement | string;
  onAuthorize?: Function;
  service?: AuthorizeService;
}

const SUCCESS_MSG = {
  getPhoneNumber: "getPhoneNumber:ok",
  getUserInfo: "getUserInfo:ok",
};

async function getService(
  service: AuthorizeService,
  param: object = {}
): Promise<any> {
  if (service === void 0) {
    throw `service is undefined!`;
  }
  if (isPromise(service)) {
    return (service as PromiseFn)(param);
  }
  let { params, fn, needMiniCode, codeKey } = service as ObjectService;
  params = {
    ...params,
    ...param,
  };
  if (needMiniCode) {
    params[codeKey || "code"] = await login();
  }
  return fn(params);
}

async function onGetPhoneNumber(eve: any) {
  const { errMsg, ...rest } = eve.detail;
  if (errMsg !== SUCCESS_MSG.getPhoneNumber) {
    return;
  }
  try {
    let userinfo = await getService(this.service, rest);
    // dispatch({type:"userinfo/update",payload:{userinfo}});
    onSuccess.bind(this, userinfo, eve)();
  } catch (error) {}
}

async function onGetUserInfo(eve: any) {
  const { errMsg, ...rest } = eve.detail;
  if (errMsg !== SUCCESS_MSG.getUserInfo) {
    return;
  }
  try {
    let userinfo = await getService(this.service, rest);
    // dispatch({type:"userinfo/update",payload:{userinfo}});
    onSuccess.bind(this, userinfo, eve)();
  } catch (error) {}
}

function authorizeScope(eve: any) {
  ensureAuthScope(this.authScope)
    .then(() => {
      this.onAuthorize && this.onAuthorize(eve);
    })
    .catch(() => {
      console.log(`未授权:${this.authScope}`);
    });
}

function onSuccess(...args: any) {
  isFunction(this.onAuthorize) && this.onAuthorize(...args);
}

const Authorize = (props: AuthorizeProps) => {
  const { authorize, onAuthorize, className = "", openType, ...rest } = props;
  function onClick(eve: any) {
    if (!openType) return;
    const openTypeFns = {
      contact: onSuccess.bind(props),
      launchApp: onSuccess.bind(props),
      scope: authorizeScope.bind(props),
      getUserInfo: onGetUserInfo.bind(props),
      getPhoneNumber: onGetPhoneNumber.bind(props),
    };

    if (!isFunction(openTypeFns[openType])) return;
    openTypeFns[openType](eve);
  }
  return (
    <React.Fragment>
      {!authorize ? (
        <Button
          {...rest}
          openType={openType}
          onClick={onClick}
          onContact={onClick}
          onLaunchapp={onClick}
          onGetUserInfo={onClick}
          onGetPhoneNumber={onClick}
          className={`__authorize__ ${className}`}
        >
          {props?.children}
        </Button>
      ) : (
        <Button
          {...rest}
          openType=""
          onClick={(eve) => onAuthorize && onAuthorize(eve)}
          className={`__authorize__ ${className}`}
        >
          {props?.children}
        </Button>
      )}
    </React.Fragment>
  );
};

Authorize.options = {
  addGlobalClass: true,
};

export default Authorize;
