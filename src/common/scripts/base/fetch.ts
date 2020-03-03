import { G } from './global';

interface XResponse extends Response {
  data:any | void;
}

export enum ApiHost {
  host, marketing, rocketCourse, introduce
}

class API {
  public request:Function;
  constructor(apiHostName = 'host') {
    this.request = (url:string, config?:any):Promise<XResponse> => {
      let response:XResponse;
      return new Promise((resolve, reject) => {
        let baseHost = '';
        if (!(/^http(s)?\/\//).test(url)) {
          baseHost = G.apiBase[apiHostName];
        }
        fetch(baseHost + url, {
          credentials: 'include',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          ...config,
        }).then((res) => {
          response = res as XResponse;
          return res.text();
        }).then((data) => {
          response.data = data ? JSON.parse(data) : null;
          resolve(response);
        }).catch((e) => {
          reject(e);
        });
      });
    };
  }

  get(url:string, config?:any):Promise<XResponse> {
    return this.request(url, config);
  }

  post(url:string, data:Record<string, string>, config:any = {}):Promise<XResponse> {
    return this.request(url, {
      method: 'post',
      body: JSON.stringify(data),
      ...config,
    });
  }
}

export const api = new API();
export const apiMarketing = new API('marketing');
export const apiIntroduce = new API('introduce');
export const apiRocket = new API('rocketCourse');
