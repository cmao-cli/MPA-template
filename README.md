## 下载模版
首先确保有全局安装`@cmao/yuumi`
```js
yuumi init mpa-test

//然后选择 MPA-template
// yuumi会在项目根目录插入.arcconfig和dockerfile
```

## 普通调试
```js
git clone git@github.com:cmao-cli/MPA-template.git
```

## 安装依赖
```js
npm install
```

## 开发调试
### 1. 运行
```js
npm run start
```
该命令会执行gulp start task，具体task实现请参考`@mlz/webui-gulp`

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
    ├── build //服务端编译后的文件夹
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

### 3. 添加页面
分别在服务器端`www/src/routes/[routeName]`和客户端`src/[routeName]`创建对应的路由文件夹，参照模版中的`www/src/routes/index`和`src/index`。

**www/src/routes/index**
```ts
import {Request, Response} from 'express';

export = [function (req: Request, res: Response): void {
  const index = require('../../../build/tpl/index/index.html');
  const render = index.render;

  res.send(render({
  }));
}];
```

**src/index**
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

## 打包构建
```js
npm run build
// 执行gulp build命令生成build文件夹和www/build文件夹
```

## 正式环境运行（docker中的运行流程）
1. 传入环境变量并构建`build:docker`: `"NODE_ENV=$front_env gulp build && env-status --gen",` 
2. 上传静态资源到七牛云：`RUN ./bin/qn.sh`
3. 启动node服务`start:docker`: `NODE_ENV=$front_env node www/build/app.js`


## 参考文档
https://shimo.im/docs/PDWhDQGH9wQDyPHh
