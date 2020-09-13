import React, { useState } from "react";
import { Authorize } from "@Components/index";

const TestAuthorize = () => {
  const [isAuthorize, setIsAuthorize] = useState(false);
  return (
    <React.Fragment>
      <Authorize
        openType="scope"
        authScope="userLocation"
        authorize={isAuthorize}
        style={{ marginTop: "32rpx" }}
        onAuthorize={(eve) => {
          console.log(`onAuthorize :`, eve);
          setIsAuthorize(true);
        }}
      >
        授权用户信息
      </Authorize>
    </React.Fragment>
  );
};

export default TestAuthorize;
