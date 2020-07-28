import { G } from './global';
import { api } from './fetch';
import { loadScript } from './load';
import { isWechat } from './utils';

type wxConfig = {
  js_api_list:string[];
  url:string;
  appid:string;
};

export const initWechat = async function(
  config:wxConfig = {
    appid: G.wechat && G.wechat.appid,
    js_api_list: ['updateAppMessageShareData', 'updateTimelineShareData'],
    url: window.location.href,
  },
):Promise<any> {
  if (!isWechat) {
    return;
  }
  const wx = await loadScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js', 'wx');
  const res:any = await api.post('/tiger/wechat/config/js_sdk', config as Record<string, any>);
  if (res.status === 200) {
    const wechatConfig = {
      debug: false,
      appId: res.data.appId,
      timestamp: res.data.timestamp,
      nonceStr: res.data.nonceStr,
      signature: res.data.signature,
      jsApiList: config.js_api_list,
    };
    wx.config(wechatConfig);
    return new Promise((resolve) => {
      wx.ready(() => {
        resolve(res);
      });
    });
  } else {
    return;
  }
};

type shareParams = {
  title:string;
  desc:string;
  link:string;
  imgUrl:string;
};

export const wxShare = async({ title, desc, link, imgUrl }:shareParams):Promise<void> => {
  if (!isWechat) {
    return;
  }
  wx['updateAppMessageShareData']({
    title,
    desc,
    link,
    imgUrl,
  });
  wx['updateTimelineShareData']({
    title,
    link,
    imgUrl,
  });
};
