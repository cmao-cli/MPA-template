import { Request, Response } from 'express';

export = [function(req:Request, res:Response):void {
  const { render } = require('../../../build/tpl/preact/index.html');

  res.send(render({ injectString: 'Server-side inject data!' }));
}];
