import React, { useState } from "react";
import _ from "lodash";
import { useMount } from "@Hooks/index";
import { Picker, View } from "@tarojs/components";
import { PickerMultiSelectorProps } from "@tarojs/components/types/Picker";
import { isArray, isEmpty } from "@Util/index";
import { CommonPickerProps } from "./selector";
import { BaseField } from "../fieldItem";
import "./index.less";

interface CommonMultiSelectorProps {
  rangeChildrenKey: string;
  rangeValueSeparator?: string;
  placeholderSeparator?: string;
}
export interface MultiSelectorProps
  extends PickerMultiSelectorProps,
    CommonPickerProps,
    CommonMultiSelectorProps {}

interface InternalPickerProps extends BaseField, MultiSelectorProps {}

const defaultRangeValueSeparator = ",";
const defaultRangeValueKey = "value";
const defaultRangeKey = "name";
const defaultPlaceholderSeparator = "-";

interface PickerShowTextProps {
  range: any[];
  value: number[];
  rangeKey?: string;
  placeholderSeparator?: string;
}

const getPickerShowText = (props: PickerShowTextProps): string => {
  const {
    range,
    value,
    rangeKey = defaultRangeKey,
    placeholderSeparator = defaultPlaceholderSeparator,
  } = props;
  return _.reduce(
    value,
    (res, _value, index) => {
      const filedValue: string = _.get(
        range,
        `[${index}].${_value}.${rangeKey}`
      );
      res.push(filedValue);
      return res;
    },
    ([] as unknown) as string[]
  ).join(placeholderSeparator);
};

interface PickerRangeProps {
  range: any[];
  value: number[];
  rangeChildrenKey: string;
}

const getPickerRange = (props: PickerRangeProps): any[] => {
  let { range, rangeChildrenKey, value } = props;
  value = value || [];
  let res: any[] = [];
  const getChild = (item, path) => _.get(item, `${path}.${rangeChildrenKey}`);
  let index = 0;
  let child = getChild(range, `[${value[index] || 0}]`);
  while (child && isArray(child)) {
    res.push(child);
    child = getChild(child, value[++index] || 0);
  }
  return [range, ...res];
};

type RangeValue = {
  index: number;
  range: any[];
};
const pickerValueToIndex = (props: InternalPickerProps): number[] => {
  const {
    range,
    fieldValue,
    rangeValueKey = defaultRangeValueKey,
    rangeValueSeparator,
    rangeChildrenKey,
  } = props;
  if (fieldValue == null) return [];
  let values = fieldValue.split(
    rangeValueSeparator || defaultRangeValueSeparator
  );
  let defaultRes: RangeValue[] = [];
  let rangeValue = _.reduce(
    values,
    (res, value, index) => {
      const currRange = isEmpty(res)
        ? range
        : res[((index as unknown) as number) - 1].range;
      let valueInd = isEmpty(currRange)
        ? 0
        : _.findIndex(currRange, (item) => item[rangeValueKey] == value);
      valueInd = valueInd === -1 ? 0 : valueInd;
      res[index] = {
        index: valueInd,
        range: _.get(currRange, `[${valueInd}].${rangeChildrenKey}`, []),
      };
      return res;
    },
    defaultRes
  );
  return rangeValue.map((item) => item.index);
};

interface PickerIndexToValueProps {
  range: any[];
  value: number[];
  rangeValueKey?: string;
  rangeValueSeparator?: string;
}

const pickerIndexToValue = (props: PickerIndexToValueProps): string => {
  const {
    range,
    value,
    rangeValueKey = defaultRangeValueKey,
    rangeValueSeparator = defaultRangeValueSeparator,
  } = props;
  return _.reduce(
    value,
    (res, _value, index) => {
      const filedValue: string = _.get(
        range,
        `[${index}].${_value}.${rangeValueKey}`
      );
      res.push(filedValue);
      return res;
    },
    ([] as unknown) as string[]
  ).join(rangeValueSeparator);
};

const Component = (props: InternalPickerProps) => {
  const {
    placeholder,
    placeholderProps,
    placeholderSeparator,
    fieldValue,
    fieldChange,
    rangeValueKey,
    rangeChildrenKey,
    rangeValueSeparator,
    ...pickerProps
  } = props;
  const [value, setValue] = useState({
    pickerIndex: [0],
    pickerShowText: "",
    pickerRange: [[]],
  });
  const { pickerIndex, pickerShowText, pickerRange } = value;
  useMount(() => {
    const index = pickerValueToIndex(props);
    const range = getPickerRange({
      rangeChildrenKey,
      range: props.range,
      value: pickerIndex,
    });
    const text = getPickerShowText({
      range,
      value: index,
      rangeKey: props.rangeKey,
      placeholderSeparator,
    });
    setValue({
      pickerIndex: index,
      pickerShowText: text,
      pickerRange: range,
    });
  });
  const onColumnChange = (eve) => {
    const { column, value: _value } = eve.detail;
    pickerIndex[column] = _value;
    const range = getPickerRange({
      rangeChildrenKey,
      range: props.range,
      value: pickerIndex,
    });
    let index: number[] =
      pickerIndex.length > range.length
        ? pickerIndex.slice(0, range.length)
        : [...pickerIndex, ...Array(range.length).fill(0)].slice(
            0,
            range.length
          );
    if (column === 0) {
      index.fill(0);
    }
    index[column] = _value;
    setValue({
      ...value,
      pickerIndex: index,
      pickerRange: range,
    });
  };
  const isPlaceholder = fieldValue == null;
  return (
    <Picker
      {...pickerProps}
      range={pickerRange}
      mode="multiSelector"
      onChange={(eve) => {
        const _value = eve.detail.value;
        setValue({
          ...value,
          pickerIndex: _value,
          pickerShowText: getPickerShowText({
            range: pickerRange,
            value: _value,
            rangeKey: props.rangeKey,
            placeholderSeparator,
          }),
        });
        fieldChange(
          pickerIndexToValue({
            range: pickerRange,
            value: _value,
            rangeValueKey,
            rangeValueSeparator,
          })
        );
      }}
      value={pickerIndex}
      onColumnChange={onColumnChange}
    >
      <View
        className={`${isPlaceholder ? "__picker_placeholder__" : ""} ${
          placeholderProps?.className || ""
        }`}
      >
        {isPlaceholder ? placeholder : pickerShowText}
      </View>
    </Picker>
  );
};

export default Component;
