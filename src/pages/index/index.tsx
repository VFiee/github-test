import React from "react";
import TRender from "@TRender";
import NavigationBar from "@Components/navigationBar";
import "./index.less";

function Index() {
  return (
    <React.Fragment>
      <NavigationBar
        left={{
          onClick: (eve) => {
            console.log(eve);
          },
        }}
        right={{
          onClick: (...args) => {
            console.log(args);
          },
        }}
        backgroundColor="#00ab84"
      />
      <TRender />
    </React.Fragment>
  );
}

export default Index;
