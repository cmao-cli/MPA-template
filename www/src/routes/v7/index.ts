import { Request, Response, NextFunction } from 'express';
import abtest from '../../abtest';

export = [
  // abtest中间件，如不需要可去掉该中间件函数
  function(req:Request, res:Response, next:NextFunction):void {
    const context = { req, res };
    const { BTS } = req.query;
    // 定义ab test名称
    if (BTS === '5') {
      abtest(context, 'v7-register-a', 'v7-register-b');
    }
    next();
  },
  function(req:Request, res:Response):void {
    const { render } = require('../../../build/tpl/v7/index.html');
    res.send(
      render({
        serverTime: Date.now(),
      }),
    );
  },
];
