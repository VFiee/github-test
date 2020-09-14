// @ts-nocheck
/* eslint-disable import/no-commonjs */
const fs = require("fs");
const { exec } = require("child_process");
const chalk = require("chalk");

const pwd = process.cwd();
const _path = pwd + "/src/components";

let dirs = fs.readdirSync(_path);

removePagesDir();

function removePagesDir() {
  exec(`rm -rf ${pwd}/src/pages && mkdir ${pwd}/src/pages`, () => {
    init();
  });
}

dirs = dirs.filter((dir) => {
  const stat = fs.statSync(_path + "/" + dir);
  if (stat.isDirectory()) {
    const testPath = `${_path}/${dir}/__test__`;
    const testExist = fs.existsSync(testPath);
    if (!testExist) return false;
    return fs.statSync(testPath).isDirectory();
  }
  return false;
});

const pageTemplate = (name) => {
  return `import React from "react";
  import Test from "@Components/${name}/__test__";
  
  function TestPage() {
    return (
      <React.Fragment>
        <Test />
      </React.Fragment>
    );
  }
  
  export default TestPage;
  `;
};
function linkDir(name, src, dist) {
  const page = pageTemplate(name);
  const configPath = `${src}/index.config.ts`;
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }
  if (fs.existsSync(configPath)) {
    fs.copyFileSync(configPath, `${dist}/index.config.ts`, (err) => {
      err && console.log(err);
    });
  }
  fs.writeFileSync(`${dist}/index.tsx`, page, (err) => {
    err && console.log(err);
  });
}

const template = (components) => `import React from "react";
import { View } from "@tarojs/components";
import { navigateTo } from "@Util/index";
import "./index.less";

function Index() {
  return (
    <React.Fragment>
    ${components}
    </React.Fragment>
  );
}

export default Index;
`;
const lessTpl = `.test-item {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eee;
  text-align: center;
  line-height: 100px;
  font-size: 32px;
  color: #333;
  &:last-child {
    border-bottom:1px solid #eee
  }
}
`;

const configTpl = `export default {
  navigationBarTitleText: "首页",
};
`;

function generatePage(dir, dirname) {
  linkDir(dirname, dir, `${pwd}/src/pages/${dirname}`);
  addPageIndex(dirs);
}

function addPageIndex() {
  let tsx = dirs.reduce((res, dir) => {
    res += `<View
    className="test-item border-top"
    onClick={() =>
      navigateTo({
        url: "/pages/${dir}/index",
      })
    }
  >${dir}</View>`;
    return res;
  }, "");
  const pagePath = `${pwd}/src/pages/index`;
  if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath, (err) => {
      console.log(err);
    });
  }
  fs.writeFileSync(`${pagePath}/index.tsx`, template(tsx));
  fs.writeFileSync(`${pagePath}/index.less`, lessTpl);
  fs.writeFileSync(`${pagePath}/index.config.ts`, configTpl);
}

function initComponentPages() {
  dirs.forEach((dir) => generatePage(`${_path}/${dir}/__test__`, dir));
}

function logPages() {
  let pages = dirs.map((dir) => `pages/${dir}/index`);
  pages.unshift(`pages/index/index`);
  console.log(JSON.stringify(pages));
}

function prettier() {
  exec(`prettier ${process.cwd()}/src --write`, (err) => {
    err && console.log(err);
  });
  console.log(
    chalk.green(`
  🎉🎉🎉 测试组件已生成
  `)
  );
}

function init() {
  initComponentPages();
  logPages();
  prettier();
  process.exit();
}
