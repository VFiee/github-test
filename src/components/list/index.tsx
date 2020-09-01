import React, {
  Fragment,
  ComponentType,
  useState,
  useEffect,
  useRef,
} from "react";
import { ScrollView } from "@tarojs/components";
import { ScrollViewProps } from "@tarojs/components/types/ScrollView";
import Line from "@/components/divider";
import Loading from "@/components/loading";
import { BaseObject } from "@Types/index";
import { showLoading, hideLoading } from "@tarojs/taro";

export interface VirtualProps extends ScrollViewProps {
  params?: BaseObject;
  Component: ComponentType<BaseObject>;
  service: (...args) => Promise<BaseObject>;
  onPulling?: (...args) => Promise<any>;
  onScrollBottom?: (...args) => Promise<any>;
  showBottomLine?: boolean;
  BottomLine?: ComponentType;
  showBottomLoading?: boolean;
  BottomLoading?: ComponentType;
}

export interface SkeletonProps {
  showSkeleton?: boolean;
  Skeleton?: ComponentType;
}

export interface VirtualListProps extends VirtualProps {
  setHasRequest: (isRequest: boolean) => void;
}

export interface ListProps extends VirtualProps, SkeletonProps {}

const VirtualList = (props: VirtualListProps) => {
  let {
    Component,
    service,
    params = {},
    showBottomLine = true,
    BottomLine = Line,
    showBottomLoading = true,
    BottomLoading = Loading,
    setHasRequest,
    className = "",
    ...restProps
  } = props;
  const statusRef = useRef({
    isPulling: false,
    isBottom: false,
  });
  const hasRequestRef = useRef(false);
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const [{ isReady, list, hasMore }, setList] = useState({
    list: [],
    isReady: true,
    hasMore: false,
  });
  useEffect(() => {
    if (!isReady) return;
    showLoading({ title: `正在加载...`, mask: true });
    service(paramsRef.current)
      .then((res) => {
        const offset = paramsRef.current["@offset"] || 20;
        const data = res?.list || [];
        const result = statusRef.current.isBottom ? list.concat(data) : data;
        statusRef.current = {
          isPulling: false,
          isBottom: false,
        };
        paramsRef.current = {
          ...paramsRef.current,
          "@offset": result.length,
        };
        setList({
          isReady: false,
          list: result,
          hasMore: data.length >= offset,
        });
        !hasRequestRef.current && setHasRequest(true);
        hasRequestRef.current = true;
      })
      .finally(() => {
        hideLoading();
      });
  }, [isReady, list, service, setHasRequest]);
  return (
    <ScrollView
      {...restProps}
      className={`__scroll_wrap ${className}`}
      refresherTriggered={statusRef.current.isPulling}
      onRefresherRefresh={() => {
        statusRef.current.isPulling = true;
        setList({
          list,
          hasMore,
          isReady: true,
        });
      }}
      onScrollToLower={() => {
        console.log(`到达底部~`);
        if (!hasMore) return;
        statusRef.current.isBottom = true;
        setList({
          list,
          hasMore,
          isReady: true,
        });
      }}
    >
      {list.map((item, index) => (
        <Component data={item} key={index} />
      ))}
      {showBottomLine && !hasMore && <BottomLine />}
      {showBottomLoading && hasMore && <BottomLoading />}
    </ScrollView>
  );
};

const List = (props: ListProps) => {
  const { Skeleton, showSkeleton, ...restProps } = props;
  const [hasRequest, setHasRequest] = useState(false);
  return (
    <Fragment>
      {!hasRequest && showSkeleton && Skeleton ? (
        <Skeleton />
      ) : (
        <VirtualList {...restProps} setHasRequest={setHasRequest} />
      )}
    </Fragment>
  );
};

export default List;
