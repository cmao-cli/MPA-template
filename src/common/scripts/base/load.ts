const loadMap:{[type:string]:Promise<any>} = {};

export function loadScript(src:string, varName?:string):Promise<any> {
  if (loadMap[src]) {
    return loadMap[src];
  }
  const res = new Promise(function(resolve, reject) {
    const el = document.createElement('script');
    el.onload = function():void {
      resolve(varName && (window as any)[varName]);
    };

    el.onerror = function(e):void {
      el.onload = null;
      el.onerror = null;
      document.body.removeChild(el);
      reject(e);
    };
    el.src = src;
    el.async = true;
    document.body.appendChild(el);
  });
  loadMap[src] = res;
  return res;
}
