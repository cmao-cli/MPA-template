import { gType } from '@mlz/webui-gulp';

type globalType = gType & {
  apiBase:{
    common:string;
    [propName:string]:string;
  };
  hostBase:{
    [propName:string]:string;
  };
};

export const G:globalType = (window as any).G;
