import React, { ReactElement, useState, useEffect, useRef } from "react";
import { showLoading, hideLoading } from "@tarojs/taro";
import Authorize from "@Components/authorize";

const mockPost = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        session: "1321312123143asda",
        user_id: "967865",
      });
    }, 2000);
  });
};

type EnsureLoginProps = {
  onSuccess?: (...args) => any;
  children: string | ReactElement;
};

const EnsureLogin = (props: EnsureLoginProps) => {
  const phoneRef = useRef();
  const [isLogin, setLoginState] = useState(false);
  const [isReady, setReadyState] = useState(false);
  const onGetPhoneNumber = (eve) => {
    const { errMsg, ...rest } = eve.detail;
    if (errMsg !== "getPhoneNumber:ok") return;
    phoneRef.current = rest;
    setReadyState(true);
  };
  useEffect(() => {
    if (!isReady || !phoneRef.current) return;
    showLoading({ title: "正在登录..." });
    mockPost()
      .then((userinfo) => {
        console.log(userinfo);
        setLoginState(true);
        setReadyState(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        hideLoading();
      });
  }, [isReady]);
  return (
    <Authorize
      isSatisfy={isLogin}
      openType="getPhoneNumber"
      onGetPhoneNumber={onGetPhoneNumber}
    >
      {props.children}
    </Authorize>
  );
};

export default EnsureLogin;
