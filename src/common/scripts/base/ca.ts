import Report from '@cmao/report';
import { G } from './global';

/**
 * 落地页埋点文档：https://shimo.im/sheet/HUuORJcNR2w5s5cZ
 */

let ca:Report;

export function caInit(extraParams:Record<string, any> = {}):Promise<Report> {
  return G.ASYNC_SCRIPT_PROMISE['caMain'].then((mod:any) => {
    if (ca) {
      return ca;
    }
    ca = new mod.Report();

    ca.init({
      product_code: 'landpage',
      url: 'https://collection.codemao.cn/report/landpage',
      is_dev: G.ENV !== 'production',
      heatmap: true,
      server_time: G.SERVER_INJECTED_DATA.serverTime,
    });

    return ca;
  });
}

export function caEvent(key:string, segmentation:Record<string, string>):void {
  caInit().then((ca) => {
    ca.add_event({
      key,
      segmentation,
    });
  }).catch(() => {
    //
  });
}
