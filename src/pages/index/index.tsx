import React from "react";
import Test from "@TRender/render";
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
      <Test />
    </React.Fragment>
  );
}

export default Index;
