declare const window:any;
import { G } from './global';
import { $$ } from './dom';

export function qsParse(url:string = location.href):{ [key:string]:string } {
  const queryMatch = url.replace(/[^?]*\?/, '').match(/([^?=&]+)(=([^&]*))/g);
  return (
    !!queryMatch &&
    queryMatch.reduce((a:any, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {})
  );
}

export function checkPhoneNumber(phoneNumber:string):boolean {
  return phoneNumber.length === 11 && /^1[3456789]\d{9}$/.test(phoneNumber);
}

export const dataConfig = G.SERVER_INJECTED_DATA && G.SERVER_INJECTED_DATA.dataConfig;

export const isWechat:boolean = /micromessenger/i.test(navigator.userAgent.toLowerCase());

export const obj2urlParam = function(obj:Record<string, string>):string {
  return Object.entries(obj)
    .map((item:any) => `${item[0] }=${ item[1]}`)
    .join('&');
};

// passive兼容
let passiveSupported:boolean | { passive:boolean } = false;
try {
  const options = {
    get passive():void {
      // This function will be called when the browser
      //   attempts to access the passive property.
      passiveSupported = { passive: true };
      return;
    },
  };
  window.addEventListener('test', options, options);
  window.removeEventListener('test', options, options);
} catch (err) {
  passiveSupported = false;
}

export const passiveOption = passiveSupported;

// 从cookie中获取abtest的命中结果值
export function abTest():string {
  let arr;
  const reg = new RegExp('(^| )' + 'abtest' + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return '';
}

export const alwaysScrollTop = () => {
  window.addEventListener('load', function() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  });
};

export const lazyLoadImg = () => {
  // 滚动触发懒加载
  window.addEventListener(
    'scroll',
    function lazyLoadListener():void {
      if (window.scrollY === 0) {
        return;
      }
      const lazyEle:HTMLElement[] = Array.prototype.slice.call($$('[data-src]'));
      if (lazyEle.length) {
        lazyEle.map((ele):void => {
          const src = ele.dataset.src;
          if (ele.tagName === 'IMG') {
            ele.setAttribute('src', src);
          } else {
            ele.style.backgroundImage = `url(${src})`;
          }
        });
      }
      window.removeEventListener('scroll', lazyLoadListener);
    },
    passiveOption,
  );
};
