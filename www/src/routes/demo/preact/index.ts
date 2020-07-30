import { Request, Response } from 'express';

export = function(req:Request, res:Response):void {
  const { render } = require('../../../../build/tpl/demo/preact/index.html');

  res.send(render());
};
