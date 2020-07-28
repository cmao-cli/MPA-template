import { gType } from '@mlz/webui-gulp';

type globalType = gType & {
  apiBase:{
    common:string;
    [propName:string]:string;
  };
  hostBase:{
    [propName:string]:string;
  };
  wechat:{
    appid:string;
  };
};

export const G:globalType = (window as any).G;
