type gType = {
  SERVER_INJECTED_DATA:Record<string, any>;
  ENV:string;
  apiBase:{
    host:string;
    marketing:string;
    rocketCourse:string;
    introduce:string;
    [propName:string]:string;
  };
  hostBase:{
    mobile:string;
    [propName:string]:string;
  };
  cdnBase:string;
}

export const G:gType = (window as any).G;
