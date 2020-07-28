import Report from '@cmao/report';
import { G } from './global';
import { qsParse, abTest, passiveOption } from './utils';
import { $$ } from './dom';

// 从url中提取多级渠道参数
const { utm_source: utmSource, utm_term: utmTerm, utm_content: utmContent } = qsParse();

let ca:Report;

export function caInit():Promise<Report> {
  return G.ASYNC_SCRIPT_PROMISE['caMain'].then((mod:any) => {
    if (ca) {
      return ca;
    }
    ca = new mod.Report();

    // 初始化埋点配置，根据自己业务决定product_code
    ca.init({
      product_code: 'landpage',
      url: 'https://collection.codemao.cn/report/landpage',
      is_dev: G.ENV !== 'production',
      heatmap: true,
      server_time: G.SERVER_INJECTED_DATA.serverTime,
    });
    // ca: 进入页面上报
    caStart();

    const getParent = function(ele:Element):Element {
      if (ele.getAttribute('data-buried')) {
        return ele;
      } else if (ele.parentElement) {
        return getParent(ele.parentElement);
      } else {
        return null;
      }
    };
    // 点击上报
    window.addEventListener('click', (event:Event) => {
      const partEle = getParent(event.target as Element);
      if (!partEle) {
        return;
      }
      const part = partEle
        .getAttribute('data-buried')
        .split('_')[0]
        .replace(/[^0-9]/gi, '');
      // ca: 全局点击上报
      caClick(part, partEle.getAttribute('data-buried'));
    });

    // 曝光上报
    const exposureParts = Array.prototype.slice.call($$('div[data-exposure]'));
    const windowHeight = window.innerHeight;
    const exposureListener = function():void {
      const scrollTops = document.documentElement.scrollTop || document.body.scrollTop;
      const currentPart:HTMLElement = exposureParts[0];
      if (currentPart && scrollTops + windowHeight > currentPart.offsetTop) {
        exposureParts.shift();
        // ca: 曝光上报
        caExposure(currentPart.dataset.exposure);
      } else if (!currentPart) {
        window.removeEventListener('scroll', exposureListener);
      }
    };
    exposureListener();
    window.addEventListener('scroll', exposureListener, passiveOption);

    return ca;
  });
}

export function caEvent(key:string, segmentation:Record<string, string>):void {
  caInit().then((ca) => {
    ca.add_event({
      key,
      segmentation,
    });
  }).catch();
}

export function caClick(part:string, buried:string):void {
  // 事件名根据业务决定
  caEvent('landpage_click', {
    utm_source: utmSource || '',
    utm_term: utmTerm || '',
    utm_content: utmContent || '',
    part: part ? `part${part}` : 'cover',
    element_id: buried,
    element: buried,
  });
}

export function caStart():void {
  // 事件名根据业务决定
  caEvent('landpage_new_start', {
    utm_source: utmSource || '',
    utm_term: utmTerm || '',
    utm_content: utmContent || '',
    page: window.location.host + window.location.pathname,
    page_name: abTest(),
  });
}

export function caExposure(part:string):void {
  // 事件名根据业务决定
  caEvent('landpage_exposure', {
    utm_source: utmSource || '',
    utm_term: utmTerm || '',
    utm_content: utmContent || '',
    page_name: abTest(),
    part: part,
  });
}
