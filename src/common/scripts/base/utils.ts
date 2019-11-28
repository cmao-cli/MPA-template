declare const window: any;

export function qsParse(url: string = location.href): { [key: string]: string } {
  const queryMatch = url.replace(/[^?]*\?/, '').match(/([^?=&]+)(=([^&]*))/g);
  return !!queryMatch && queryMatch.reduce((a: any, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {});
}

export function checkPhoneNumber(phoneNumber: string): boolean {
  return phoneNumber.length == 11 && (/^1[3456789]\d{9}$/).test(phoneNumber);
}

export const dataConfig = G.SERVER_INJECTED_DATA && (G.SERVER_INJECTED_DATA.dataConfig);

export const isWechat: boolean = (/micromessenger/i).test(navigator.userAgent.toLowerCase());

// passive兼容
let passiveSupported: boolean | {passive: boolean} = false;
try {
  const options = {
    get passive(): void { // This function will be called when the browser
      //   attempts to access the passive property.
      passiveSupported = {passive: true};
      return;
    }
  };
  window.addEventListener('test', options, options);
  window.removeEventListener('test', options, options);
} catch (err) {
  passiveSupported = false;
}

export const passiveOption = passiveSupported;

// 轮询函数
export function pool(cs: Function, interval: number): Promise<void> {
  return new Promise((resolve) => {
    function poolChild(): void {
      if (cs()) {
        resolve();
      } else {
        setTimeout(poolChild, interval);
      }
    }
    poolChild();
  });
}

export function changeObjectPropToLowercase(object: Record<string, any>): Record<string, string> {
  const regObj = new RegExp('([A-Z]+)', 'g');
  for (const i in object) {
    /* eslint-disable no-prototype-builtins */
    if (object.hasOwnProperty(i)) {
      let temp = object[i];
      if (regObj.test(i.toString())) {
        temp = object[
          i.replace(regObj, function (result) {
            return result.toLowerCase();
          })
        ] = object[i];
        delete object[i];
      }
      if (typeof temp === 'object' || Object.prototype.toString.call(temp) === '[object Array]') {
        changeObjectPropToLowercase(temp);
      }
    }
  }
  return object;
}
export function abTest(): string {
  let arr;
  const reg = new RegExp('(^| )' + 'abtest' + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return '';
}

export const gtag = (): void => {
  window.gtag('event', 'registered', {
    'event_category': 'engagement',
    'event_label': 'method',
  });
};

export const gtagSubmit = (page: string): void => {
  window.gtag('event', 'submit_click', {
    'event_category': 'click',
    'event_label': page + '_submit_button',
  });
};

export const v7Buried = (): void => {
  // const meteor = window.meteor;
  // const {utm_source: utmSource, utm_term: utmTerm, utm_content: utmContent} = qsParse();

  // meteor && utmSource === 'jrtt' && meteor.track('form',  {convert_id: 1625412018243597}); // 今日头条埋点
  // meteor && utmSource === 'jrtt' && utmTerm === 'guojing' && meteor.track('form',  {convert_id: 1631570647100419}); // 今日头条&抖音广告埋点
  // meteor && utmSource === 'jrtt' && utmTerm === 'guojing' && (/gj2/).test(utmContent) && meteor.track('form', {convert_id: 1632952904961163}); // 今日头条&抖音广告投放
  // meteor && utmSource === 'jrtt' && utmTerm === 'jiuxing' && (/jx8/).test(utmContent) && meteor.track('form', {convert_id: 1634217354737667}); // 今日头条&九星互动
  // meteor && utmSource === 'jrtt' && utmTerm === 'guojing' && (/gj3/).test(utmContent) && meteor.track('form', {convert_id: 1635461296837644});
  // window.emar && window.emar.saveEffect({type: 4});  // 一招-推啊JS埋码
  // window._taq && window._taq.push({convert_id: window._zm_id, event_type: 'form'});
  // window._taq && window._taq.push({convert_id: window._toutiao_id, event_type: 'form'});
  // window.utq && window.utq('track', 'FormSubmit', '274788');
  // (/utm_content=zm1/).test(window.location.search) && window._taq && window._taq.push({convert_id: '1609942535552055', event_type: 'form'});  // 今日头条-直媒账户JS埋点
  // (/utm_source=alihc/).test(window.location.search) && window.utq && window.utq('track', 'FormSubmit', '146343');
  (/utm_source=uc/).test(window.location.search) && window._agl && window._agl.push(['track', ['success', {t: 3}]]);
  (/utm_source=baidu&utm_term=xxl_adks/).test(window.location.search) && window._agl && window._agl.push(['track', ['success', {t: 3}]]);
  (/utm_source=baiduxxl&utm_term=adks/).test(window.location.search) && window._agl && window._agl.push(['track', ['success', {t: 3}]]);
  (/utm_source=baiduxxl&utm_term=zhiwei/).test(window.location.search) && window._agl && window._agl.push(['track', ['success', {t: 3}]]);
  (/utm_source=baiduxxl&utm_term=shenfen/).test(window.location.search) && window._agl && window._agl.push(['track', ['success', {t: 3}]]);
  // (/utm_source=jrtt&utm_term=maidike&utm_content=mdk1/).test(window.location.search) && meteor.track('form', {convert_id: 1636105208830988}); // 今日头条&天津麦迪克埋点
  // (/utm_source=jrtt&utm_term=maidike&utm_content=mdk2/).test(window.location.search) && meteor.track('form', {convert_id: 1636105295065101}); // 今日头条&天津麦迪克埋点
  // (/utm_source=jrtt&utm_term=guojing&utm_content=gj3/).test(window.location.search) && meteor.track('form', {convert_id: 1636105093107716}); // 今日头条&天津麦迪克埋点
  // (/utm_source=jrtt&utm_term=yima&utm_content=ym/).test(window.location.search) && meteor.track('form',  {convert_id: 1637298314631179}); // 今日头条&天津亿玛埋点
  // (/utm_source=jrtt&utm_term=youfan&utm_content=yf/).test(window.location.search) && meteor.track('form',  {convert_id: 1637840719459339}); // 今日头条投放账户JS代码添加-有范
  // (/banner=2&utm_source=jrtt&utm_term=youfan&utm_content=yf/).test(window.location.search) && meteor.track('form',  {convert_id: 1637840719459339}); // 今日头条投放账户JS代码添加-有范
  // (/banner=2&utm_source=jrtt&utm_term=jiuxing&utm_content=ss2/).test(window.location.search) && meteor.track('form',  {convert_id: 1639388889735181}); // 广告主账户名称:深圳点猫科技有限公司-02
  // (/utm_source=jrtt&utm_term=jiuxing&utm_content=ss2/).test(window.location.search) && meteor.track('form',  {convert_id: 1639388889735181}); // 广告主账户名称:深圳点猫科技有限公司-02
  // (/banner=2&utm_source=jrtt&utm_term=jiuxing&utm_content=ss3/).test(window.location.search) && meteor.track('form',  {convert_id: 1639388936114189}); // 广告主账户名称:深圳点猫科技有限公司-03
  // (/utm_source=jrtt&utm_term=jiuxing&utm_content=ss3/).test(window.location.search) && meteor.track('form',  {convert_id: 1639388936114189}); // 广告主账户名称:深圳点猫科技有限公司-03
  // (/utm_source=qitaqudao&utm_term=aiqiyi&utm_content=/).test(window.location.search) && window.iqiyiTpct.track(19901); // 爱奇艺投放
  // (/banner=1&utm_source=qitaqudao&utm_term=aiqiyi&utm_content=/).test(window.location.search) && window.iqiyiTpct.track(19901); // 爱奇艺投放
  // (/utm_source=jrtt&utm_term=yima&utm_content=/).test(window.location.search) && meteor.track('form', {convert_id: 1641813101381708}); // 今日头条&天津亿玛  天津亿玛——深圳点猫科技有限公司广州分公司——编程猫
  // (/banner=2&utm_source=jrtt&utm_term=yima&utm_content=/).test(window.location.search) && meteor.track('form', {convert_id: 1641813101381708}); // 今日头条&天津亿玛  天津亿玛——深圳点猫科技有限公司广州分公司——编程猫
  // (/utm_source=jrtt&utm_term=yousixing/).test(window.location.search) && meteor.track('form', {convert_id: 1645636639357965}); // 今日头条&优思行上报埋点
};