import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { config } from './config';

const app = express();

// inject runtime config
(function injectConfig(base:string):void {
  for (const name of fs.readdirSync(base)) {
    const filePath = path.join(base, name);
    if (fs.statSync(filePath).isDirectory()) {
      injectConfig(filePath);
    } else if (/\.html\.js$/.test(filePath)) {
      const content = fs
        .readFileSync(filePath)
        .toString()
        .replace(
          /\{\s*__RUNTIME_CONFIG_INJECT__\s*:\s*1\s*,?\s*\}/,
          JSON.stringify(Object.assign({ ENV: config.ENV }, config.runtime))
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"'),
        );
      fs.writeFileSync(filePath, Buffer.from(content));
    }
  }
})(path.join(__dirname, '../build/tpl/'));

app.use(compression());
app.use(express.static(path.join(__dirname, '../../build/')));
app.use(cookieParser());

(function requireRoute(root:string, base:string):void {
  for (const route of fs.readdirSync(base)) {
    const routePath = path.join(base, route);
    if (fs.statSync(routePath).isDirectory()) {
      requireRoute(root, routePath);
    }
  }

  if (fs.existsSync(path.join(base, 'index.js'))) {
    app.use(path.join('/', path.relative(root, base), '*'), require(base));
  }
})(path.join(__dirname, './routes/'), path.join(__dirname, './routes/'));

const server = http.createServer(app);
server.listen(config.serverPort, function() {
  /* eslint-disable no-console */
  console.log('Listening on %j', config.serverPort);
});
