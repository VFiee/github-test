import React from "react";
import { Divider } from "@Components/index";

const Component = () => {
  return (
    <React.Fragment>
      <Divider text="买房要省钱,就找真二网" />
      <Divider text="文本" />
      <Divider text="文本" contentPosition="left" />
      <Divider text="文本" contentPosition="right" />
      <Divider
        style={{
          color: "#ff6767",
          borderColor: "#00ab84",
        }}
      />
      <Divider
        text="买房要省钱,就找真二网"
        hairLine={false}
        style={{
          color: "#ff6767",
          borderColor: "#00ab84",
        }}
      />
    </React.Fragment>
  );
};

export default Component;
