import React from "react";
import { View } from "@tarojs/components";
import { navigateTo } from "@Util/index";
import "./index.less";

function Index() {
  return (
    <React.Fragment>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/appbar/index",
          })
        }
      >
        appbar
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/authorize/index",
          })
        }
      >
        authorize
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/carousel/index",
          })
        }
      >
        carousel
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/divider/index",
          })
        }
      >
        divider
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/empty/index",
          })
        }
      >
        empty
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/icon/index",
          })
        }
      >
        icon
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/image/index",
          })
        }
      >
        image
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/loading/index",
          })
        }
      >
        loading
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/overlay/index",
          })
        }
      >
        overlay
      </View>
      <View
        className="test-item border-top"
        onClick={() =>
          navigateTo({
            url: "/pages/transition/index",
          })
        }
      >
        transition
      </View>
    </React.Fragment>
  );
}

export default Index;
