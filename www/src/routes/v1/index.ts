import { Request, Response } from 'express';

export = [function(req:Request, res:Response):void {
  const index = require('../../../build/tpl/v1/index.html');
  const render = index.render;

  res.send(render());
}];
