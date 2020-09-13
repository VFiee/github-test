import React from "react";
import { Loading } from "@Components/index";

const Component = () => {
  return (
    <React.Fragment>
      <Loading block />
      <Loading block color="#00ab84">
        加载中...
      </Loading>
      <Loading block vertical>
        加载中...
      </Loading>
      <Loading block type="spinner" />
      <Loading block type="spinner">
        加载中...
      </Loading>
      <Loading block vertical color="#00ab84" type="spinner">
        加载中...
      </Loading>
    </React.Fragment>
  );
};

export default Component;
