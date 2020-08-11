import React, { Fragment, ComponentType } from "react";

export interface SkeletonProps {
  isMount: boolean;
  Component: ComponentType;
  targetComponent: () => JSX.Element;
}

const Skeleton = (props: SkeletonProps) => {
  const { isMount = false, Component, targetComponent } = props;
  return <Fragment>{isMount ? targetComponent() : <Component />}</Fragment>;
};

export default Skeleton;
