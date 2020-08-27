import React, { useRef } from "react";
// import _ from "lodash";
import { View } from "@tarojs/components";
// import Blank from "@Components/blank";
// import BottomLine from "@Components/bottomLine";
// import BottomLoading from "@Components/bottomLoading";
// import Carousel from "@Components/carousel";
// import Authorize from "@Components/authorize";
// import EnsureLogin from "@PageComponents/ensureLogin";
// import List from "@Components/list";
import Form, { CreateForm } from "@Components/form";
import datas from "./multipleSelector";
// import { BaseObject } from "@Types/index";
// import Image from "./image";
import "./index.less";

// const Test = (props) => {
//   const string: string = " ";
//   const [value, setValue] = useState(props.fieldValue);
//   console.log(`value:`, value, `typeof :value=`, typeof value);

//   return <View className="test_extra">test</View>;
// };
// const service = (params): Promise<BaseObject> => {
//   console.log(params);
//   console.log(`has request`);
//   const list = new Array(60).fill(0);
//   console.log(list.length);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ list });
//     }, 2500);
//   });
// };
// function getPhoneNumber(eve) {
//   console.log(eve);
// }

const TestRender = () => {
  // const [params, setParams] = useState({});
  const formRef = useRef<CreateForm>();
  return (
    <View className="wrap">
      {/* <Test value="123" fieldValue="" /> */}
      {/* <Image />
      <Blank />
      <BottomLine />
      <BottomLoading />
      <Carousel
        data={[{ id: "76408473" }, { id: "76408474" }]}
        swiperPorps={{
          customIndicator: true,
          dotActiveLine: true,
          style: { width: "100%", height: "500rpx" },
          onChange: (eve) => {
            console.log(eve);
          },
        }}
      ></Carousel>
      <Authorize
        isSatisfy={false}
        openType="getPhoneNumber"
        onGetPhoneNumber={getPhoneNumber}
      >
        <View>123123123113</View>
      </Authorize>
      <EnsureLogin>
        <View>必须登录</View>
      </EnsureLogin> */}
      {/* <View onClick={() => setParams({ number: _.random(0, 60) })}>刷新</View> */}
      {/* <List
        scrollY
        refresherEnabled
        Component={Test}
        params={params}
        service={service}
        // style={{ height: "100%" }}
        className="test_scroll_view"
      /> */}
      <Form
        initialValues={{
          text_input: "12312312312",
          check_box: "2",
          sex: "2",
          range: 10,
          switch: 0,
          selector: "美国",
          selector2: "china",
        }}
        name="testForm"
        fields={[
          {
            fieldType: "input",
            label: "备注信息",
            fieldKey: "text_input",
            fieldProps: {
              type: "text",
              placeholder: "请输入备注信息",
              // password: true,
              className: "",
              onInput: (eve) => {
                console.log(eve);
              },
            },
            rules: [
              // {
              //   required: true,
              //   min: 10,
              //   message: "最低长度为10",
              // },
            ],
          },
          {
            label: "最近地区",
            fieldType: "checkbox",
            fieldKey: "check_box",
            fieldProps: {
              options: [
                {
                  label: "郑州",
                  value: "1",
                  color: "#00ab84",
                },
                {
                  label: "驻马店",
                  value: "2",
                  checked: false,
                  color: "#00ab84",
                },
              ],
            },
          },
          {
            fieldType: "radio",
            label: "性别",
            fieldKey: "sex",
            fieldProps: {
              options: [
                {
                  label: "男",
                  value: "1",
                },
                {
                  label: "女",
                  value: "2",
                },
              ],
            },
          },
          {
            fieldType: "slider",
            label: "滑动选择大小",
            fieldKey: "range",
            fieldProps: {
              min: 10,
              max: 200,
              step: 10,
              showValue: true,
            },
          },
          {
            fieldType: "switch",
            fieldKey: "switch",
            label: "开启城市配置",
            fieldProps: {
              checked: false,
            },
          },
          {
            fieldType: "textarea",
            fieldKey: "text_area",
            label: "备注",
            fieldProps: {
              fixed: true,
              placeholder: "请输入备注信息",
            },
          },
          {
            fieldType: "selector",
            fieldKey: "selector",
            label: "国家",
            fieldProps: {
              placeholder: "请选择国家",
              range: ["中国", "美国", "韩国", "意大利"],
            },
            // rules: [
            //   {
            //     required: true,
            //     message: "请选择国家啊!",
            //   },
            // ],
          },
          {
            fieldType: "multiSelector",
            fieldKey: "multiSelector",
            label: "请选择城市",
            fieldProps: {
              placeholder: "请选择城市",
              rangeKey: "name",
              rangeValueKey: "value",
              rangeChildrenKey: "children",
              range: datas,
              rangeValueSeparator: ",",
            },
            // rules: [
            //   {
            //     required: true,
            //     message: "请选择国家啊!",
            //   },
            // ],
          },
          {
            fieldType: "date",
            fieldKey: "date",
            label: "日期",
            fieldProps: {
              placeholder: "请选择日期",
            },
          },
          {
            fieldType: "time",
            fieldKey: "time",
            label: "时间",
            fieldProps: {
              placeholder: "请选择时间",
            },
          },
          {
            fieldType: "region",
            fieldKey: "region",
            label: "省市区",
            fieldProps: {
              value: [],
              placeholder: "请选择时间",
            },
          },
        ]}
        ref={formRef}
        onSubmit={console.log}
      />
      <View
        className="submit"
        onClick={() => {
          formRef.current?.triggle("reset");
        }}
      >
        重置
      </View>
      <View
        className="submit"
        onClick={() => {
          formRef.current?.triggle("submit");
        }}
      >
        提交
      </View>
    </View>
  );
};

export default TestRender;
