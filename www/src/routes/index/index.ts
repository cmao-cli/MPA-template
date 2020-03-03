import { Request, Response } from 'express';

export = [function(req:Request, res:Response):void {
  const index = require('../../../build/tpl/index/index.html');

  const { revision } = req.query;
  const render = index.render;

  res.send(render({
    revision: revision === '1',
  }));
}];
