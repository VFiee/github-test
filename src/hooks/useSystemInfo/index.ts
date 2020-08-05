import { useRef } from "react";
import { getSystemInfoSync } from "@tarojs/taro";
import useMount from "../useMount";

const useSystemInfo = () => {
  const sysRef = useRef(getSystemInfoSync());
  useMount(() => {
    if (sysRef.current == null) {
      sysRef.current = getSystemInfoSync();
    }
  });
  return sysRef.current;
};

export default useSystemInfo;
