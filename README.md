## 下载模版
首先确保有全局安装`@cmao/yuumi`
```js
yuumi init mpa-test

//然后选择 MPA-template
// yuumi会在项目根目录插入.arcconfig和dockerfile，如果只需要普通调试直接git clone下载
```

## 安装依赖
```js
npm install
```

## 开发调试
1. 运行
```js
npm run start
```
该命令会执行gulp start task，具体task实现请参考`@mlz/webui-gulp`

2. 添加页面
分别在服务器端`www/src/routes/[routeName]`和客户端`src/[routeName]`创建对应的路由文件夹，参照模版中的`www/src/routes/index`和`src/index`。

**www/src/routes/index**
```ts
// 导出中间件数组，在www/src/app.ts中会遍历所有的www/src/routes文件夹设置路由中间件
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
