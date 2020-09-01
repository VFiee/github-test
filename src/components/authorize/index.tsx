import React from "react";
import { Button } from "@tarojs/components";
import { ButtonProps } from "@tarojs/components/types/Button";
import "./index.less";

export interface AuthorizeProps extends ButtonProps {
  isSatisfy: boolean;
  children?: React.ReactElement;
}

const Authorize = (props: AuthorizeProps) => {
  const { isSatisfy, className, children, ...restProps } = props;
  return (
    <React.Fragment>
      {!isSatisfy ? (
        <Button {...restProps} className={`_authorize__button__ ${className}`}>
          {!!children && children}
        </Button>
      ) : (
        <React.Fragment>{!!children && children}</React.Fragment>
      )}
    </React.Fragment>
  );
};

Authorize.options = {
  addGlobalClass: true,
};

export default Authorize;
