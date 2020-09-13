import React from "react";
import { AppBar } from "@Components/index";

const TestNavigationBar = () => {
  return (
    <React.Fragment>
      <AppBar
        backgroundColor="#00ab84"
        type="black"
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
