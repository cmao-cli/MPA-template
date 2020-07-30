## 下载模版
首先确保有全局安装`@cmao/yuumi`
```js
yuumi init mpa-test

// 然后选择 MPA-template
// yuumi会在项目根目录插入.arcconfig和dockerfile
```

## 普通调试
```js
git clone git@github.com:cmao-cli/MPA-template.git
```

## 安装依赖(node-11.13.x)
```js
npm install
```

## 开发调试
### 1. 运行

```js
cp config/local.json.example config/local.json
npm run start
```
该命令会执行gulp start task：该命令是在gulpfile.js中从[@mlz/webui-gulp](https://github.com/juicecube/webui-gulp)中注入的命令。

start之后会顺序执行以下的gulp任务包括：
  1. clean:build：删除当前目录下的build文件
  2. copy：将所有的静态资源文件复制到根目录下的build文件夹下
  3. bundle：包括了两个任务分别是：
  4. bundle:html：处理客户端的所有的html文件包括处理html文件中css，sass，js引用等
  5. bundle:ts：将客户端的ts文件打包到build文件夹下
  6. server:ts：编译服务器端的ts文件到www/build目录
  7. server:tpl：使用[gulp-mt2amd](https://github.com/webyom/gulp-mt2amd)将.html模版文件编译到www/build/tpl/路径下
  8. clean:bundle：清除build下无用所有html文件

最终应用的运行结构目录为：www/build
```js
├── app.js
├── config.js
├── routes
│   └── index
│       └── index.js
└── tpl
    └── index
        ├── index.html.js
        └── templates
            └── a.tpl.html.js

```
app.js中启动服务，加载routes下的所有路由文件，在路由处理中间件中调用编译出的模版文件的`render`方法传入变量。

### 2. 项目结构
```js
.
├── README.md
├── bin
│   ├── qn.sh //七牛上传脚本
│   └── start.sh //项目启动脚本
├── config //项目配置文件包括开发调试配置和运行时配置
│   ├── default.json
│   ├── local.json
│   ├── local.json.example
│   └── qnconfig.json
├── gulp // 自定义gulp任务文件
├── gulpfile.js //gulp配置文件
├── package-lock.json
├── package.json
├── src // 客户端
│   ├── common //公共组件和基础库代码
│   │   ├── components //公共组件
│   │   ├── includes //被模版include指令包含的脚本和样式
│   │   ├── layouts //公共布局模版目录
│   │   ├── scripts //公共脚本目录
│   │   └── styles //样式目录
│   └── index //按照路由组织目录结构，index路由，内部目录结构与common类似
│       ├── assets
│       ├── index.html
│       ├── scripts
│       ├── styles
│       └── templates
├── tsconfig.json
├── types
│   ├── closest.d.ts
│   └── global.d.ts
└── www //服务端
    ├── build //服务端编译后生成的文件夹，最终项目运行的文件夹
    │   ├── abtest.js
    │   ├── app.js
    │   ├── config.js
    │   ├── routes
    │   └── tpl
    ├── src
    │   ├── abtest.ts
    │   ├── app.ts //服务器入口文件
    │   ├── config.ts
    │   └── routes //组织各个路由的处理方法
    ├── tsconfig.json
    └── types
        └── global.d.ts
```
---
## 开发

> 完整示例：项目内有一个包含了表单组件、轮播组件、弹框组件及埋点功能的完整示例（文件路径：`src/v7`），可以启动项目后访问/v7路径查看效果

#### 如何添加页面
分别在服务器端`www/src/routes/[routeName]`和客户端`src/[routeName]`创建对应的路由文件夹，参照模版中的`www/src/routes/index`和`src/index`。

**服务端：www/src/routes/index**
```ts
import {Request, Response} from 'express';

export = [function (req: Request, res: Response): void {
  const index = require('../../../build/tpl/index/index.html');
  const render = index.render;

  res.send(render({
  }));
}];
```

**客户端： src/index**
目录结构：
```js
└── index
    ├── assets
    │   └── part-1-bg-1-2.jpg
    ├── index.html
    ├── scripts
    │   ├── main.ts
    │   └── stat
    ├── styles
    └── templates
```

#### 添加子组件
在`src/[routeName]/templates`目录下新建带`.tpl.html`后缀的文件（如dialog.tpl.html）,然后可以开始写html，可从外部传入数据控制元素
```
// src/[routeName]/templates/xxx.tpl.html

<p><%=$data.text%></p>
```
在`src/[routeName]/index.html`里引入子组件并传递数据
```
 <%=require('./templates/xxx.tpl.html').render({
  text: 'text'
})%>
```
> 子组件只有html结构，样式写在页面样式内(`src/[routeName]/styles/index.scss`)

#### 服务端传递数据（客户端模板使用）
服务端文件中`www/src/routes/[routeName]/index.ts`，在模板render函数中填入数据
```javascript
render({
  testData: 'test'
})
```

客户端页面文件中`src/[routeName]/index.html`可用模板语句读取
```
<!-- section "content" -->
  ...
  <%=$data.testData%>
  ...
<!-- /section -->
```


#### 服务端传递数据（客户端js使用）

服务端render填入数据
```javascript
render({
  serverTime: Date.now(),
})
```

客户端页面文件`src/[routeName]/index.html`填入插入相应模板语句（相当于`<script>window.serverTime=xxx</script>`）
```
<!-- section "content" -->
  ...
  <%=$injectData('serverTime', $data.serverTime)%>
  ...
<!-- /section -->
```
scripts/main.js中可通过全局对象调用该数据`G.SERVER_INJECTED_DATA.serverTime`


#### script脚本引入
在客户端页面中`src/[routeName]/index.html`使用带`type="text/template"`属性的script标签来引入js，`data-async`属性会异步加载异步执行
```
<!-- section "script" -->
<script data-async type="text/template" src="/common/scripts/stat/main.js"></script>
...
<!-- /section -->
```
若要确保在js加载完后执行可以在script标签增加模块名`data-entry="xxx"`
```
<!-- section "script" -->
<script data-async data-entry="caMain" type="text/template" src="/common/scripts/ca/main.js"></script>
<!-- /section -->
```
客户端会产生一个promise,可以通过全局对象`G.ASYNC_SCRIPT_PROMISE['xxx']`对应模块返回一个promise在回调中执行后续代码。

----

## 打包构建
```js
npm run build
// 执行gulp build命令生成build文件夹和www/build文件夹
```

## 正式环境运行（docker中的运行流程，自带Dockerfile，可直接使用）
1. 传入环境变量并构建`build:docker`: `"NODE_ENV=$front_env gulp build && env-status --gen",`
2. 上传静态资源到七牛云：`RUN ./bin/qn.sh`
3. 启动node服务`start:docker`: `NODE_ENV=$front_env node www/build/app.js`


## 参考文档
https://shimo.im/docs/PDWhDQGH9wQDyPHh
