import React from "react";
import Carousel from "@Components/carousel";
import { getImageUrl } from "@Util/index";
import "./index.less";

const TestCarousel = () => {
  return (
    <React.Fragment>
      <Carousel data={[]} className="carousel-item" />
      <Carousel
        data={[
          {
            src: getImageUrl("lunbo"),
          },
          {
            src: getImageUrl("lunbo"),
          },
        ]}
        swiperProps={{
          indicatorColor: "#f2f2f2",
          indicatorActiveColor: "#00ab84",
        }}
        className="carousel-item"
      />

      <Carousel
        data={[
          {
            src: getImageUrl("lunbo"),
          },
          {
            src: getImageUrl("lunbo"),
          },
        ]}
        swiperProps={{
          customIndicator: true,
          dotActiveLine: true,
          indicatorColor: "#f2f2f2",
          indicatorActiveColor: "#00ab84",
        }}
        className="carousel-item"
      />

      <Carousel
        data={[
          {
            src: getImageUrl("lunbo"),
          },
          {
            src: getImageUrl("lunbo"),
          },
        ]}
        swiperProps={{
          customIndicator: true,
          indicatorColor: "#f2f2f2",
          indicatorActiveColor: "#00ab84",
          indicatorType: "numbers",
          indicatorPosition: "bottomRight",
        }}
        className="carousel-item"
      />
    </React.Fragment>
  );
};

export default TestCarousel;
