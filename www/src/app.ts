import fs from 'fs';
import path from 'path';
import http from 'http';
import express, { Response, Request, NextFunction } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from './config';

const app = express();

// inject runtime config
(function injectConfig(base:string):void {
  for (const name of fs.readdirSync(base)) {
    const filePath = path.join(base, name);
    if (fs.statSync(filePath).isDirectory()) {
      injectConfig(filePath);
    } else if ((/\.html\.js$/).test(filePath)) {
      const content = fs.readFileSync(filePath).toString()
        .replace(/\{\s*__RUNTIME_CONFIG_INJECT__\s*:\s*1\s*\}/, JSON.stringify(config.runtime).replace(/\\/g, '\\\\').replace(/"/g, '\\"'));
      fs.writeFileSync(filePath, Buffer.from(content));
    }
  }
})(path.join(__dirname, '../build/tpl/'));

// 微信校验文件通配
app.use(function(req:Request, res:Response, next:NextFunction) {
  if ((/^\/MP_verify_/).test(req.path)) {
    res.send(req.path.match(/\/MP_verify_(.*).txt/)[1]);
  } else {
    next();
  }
});

app.use(compression());
app.use(express.static(path.join(__dirname, '../../build/')));
app.use(cookieParser());

(function(base:string):void {
  for (const route of fs.readdirSync(base)) {
    console.log(route);
    app.use(`/${route}`, require(path.join(base, route)));
  }
})(path.join(__dirname, './routes/'));

app.get('*', (req, res) => {
  res.redirect('/index');
});

const server = http.createServer(app);
const port = config.serverPort || 5000;
server.listen(port, function() {
  /* eslint-disable no-console */
  console.log('Listening on %j', port);
});
