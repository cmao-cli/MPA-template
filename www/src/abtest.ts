import {Request, Response} from 'express';

export = function (context: {req: Request; res: Response}, ...testname: string[]): void {
  const {req, res} = context;
  let ab: string;
  if (req.query.abtest) {
    ab = req.query.abtest;
  } else if (req.cookies.abtest) {
    ab = req.cookies.abtest;
  } else {
    const randomIndex = Math.floor(Math.random() * testname.length);
    ab = testname[randomIndex];
  }
  req.cookies.abtest = ab;
  res.cookie('abtest', ab, {
    maxAge: 30 * 60 * 1000,
    path: req.path
  });
};
