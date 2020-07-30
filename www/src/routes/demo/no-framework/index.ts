import { Request, Response } from 'express';

export = function(req:Request, res:Response):void {
  const { render } = require('../../../../build/tpl/demo/no-framework/index.html');
  res.send(render({
    topBgClass: 'top_title',
    serverTime: Date.now(),
  }));
};
