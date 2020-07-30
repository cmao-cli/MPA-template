import * as iris from '@cmao/iris';
import { GeetestCaptcha, CmTencentCaptcha, DisableCaptcha } from '@cmao/iris/dist/types/src/modules/captcha';
import { EnvName } from '@cmao/iris/dist/types/config';
import { G } from './global';

const irisEnv:Record<string, EnvName> = {
  development: 'dev',
  test: 'api-test',
  staging: 'staging',
  production: 'prod',
};

let inited = false;

function initIris():Promise<typeof iris> {
  return G.ASYNC_SCRIPT_PROMISE['irisMain'].then((mod:any) => {
    if (!inited) {
      mod.iris.init({
        env: irisEnv[G.ENV],
        domain: '',
      });
      inited = true;
    }
    return mod.iris;
  });
}

let codemaoCaptcha:any;

const getCodemaoCaptcha = async():Promise<any> => {
  if (!codemaoCaptcha) {
    const iris = await initIris();
    // eslint-disable-next-line require-atomic-updates
    codemaoCaptcha = new iris.captcha.CodemaoCaptcha({
      pid: 'UvOFXx2tfv',
    });
    return codemaoCaptcha;
  }
  return codemaoCaptcha;
};

/* eslint-disable */
export const showCaptcha = (identity = ''):Promise<{ ticket:string; appid:string }> => getCodemaoCaptcha().then((codemaoCaptcha) => new Promise((resolve, reject) => {
  codemaoCaptcha
    .get_captcha({
      identity: identity,
      // 腾讯验证码初始化必须要置入图形验证码的dom元素id
      // 降级后极验配置项 product 为 bind 的时候，则设置为 button 的id
      // 验证成功后的回调 回调函数可以包含ticket参数，ticket是验证成功后
      // 后端返回的一个字符串 可用于发送短信验证码等操作
      success_callback: (ticket:string, appid:string) => {
        resolve({
          ticket,
          appid,
        });
      },
      // 验证失败后的回调
      fail_callback: reject,
      // 用户主动关闭图形验证码后的回调
      close_callback: reject,
      // 为极验提供了额外的选项
      // 只对极验图形验证码生效！！
      // 其默认配置为{ product:'popup', width:'300px' }
    })
    .then((captcha:GeetestCaptcha | CmTencentCaptcha | DisableCaptcha | undefined) => {
      captcha.init().then(() => {
        captcha.show();
      }).catch(() => {
        //
      });
    })
    .catch((err:any) => {
      reject(err);
    });
}));
/* eslint-enable */
