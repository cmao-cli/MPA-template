import { Request, Response } from 'express';

export = function(req: Request, res: Response): void {
  res.redirect('/demo/no-framework/');
};
