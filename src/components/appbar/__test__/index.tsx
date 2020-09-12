import React from "react";
import AppBar from "@/components/appbar";

const TestNavigationBar = () => {
  return (
    <React.Fragment>
      <AppBar
        backgroundColor="#00ab84"
        type="black"
        onLeftClick={(...args) => {
          console.log(...args);
        }}
        onRightClick={(...args) => {
          console.log(...args);
        }}
        onTitleClick={(eve) => {
          console.log(eve);
        }}
      />
    </React.Fragment>
  );
};

export default TestNavigationBar;
