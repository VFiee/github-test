import React, { ReactElement } from "react";
import { Button } from "@tarojs/components";
import { ButtonProps } from "@tarojs/components/types/Button";
import "./index.less";

export interface AuthorizeProps extends ButtonProps {
  isSatisfy: boolean;
  children?: string | ReactElement;
  openType: keyof ButtonProps.openType;
}

const Authorize = (props: AuthorizeProps) => {
  const { isSatisfy, className, children, ...restProps } = props;
  return (
    <React.Fragment>
      {!isSatisfy ? (
        <Button {...restProps} className={`_authorize_button ${className}`}>
          {!!children && children}
        </Button>
      ) : (
        <React.Fragment>{!!children && children}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Authorize;
