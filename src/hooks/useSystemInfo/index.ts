import { useRef } from "react";
import { getSystemInfoSync } from "@Util/index";
import { useMount } from "@Hooks/index";

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
