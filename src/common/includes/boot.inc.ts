/* eslint-disable no-console */

(function():void {
  function removeNode(id:string):void {
    const el = document.getElementById(id);
    el && el.parentNode.removeChild(el);
  }

  function load(id:string, cb?:Function):void {
    const el = document.getElementById(id);
    if (el) {
      const src = el.getAttribute(el.tagName === 'SCRIPT' ? 'src' : 'href');
      const script = document.createElement('script');
      script.onload = function():void {
        removeNode(id);
        cb && cb();
      };

      script.onerror = function():void {
        console.log(`Failed to load script ${ src}`);
      };
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    } else {
      console.log(`Can not find element with id "${ id }"`);
    }
  }

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    removeNode('main-script');
    if (window.Promise && window.fetch) {
      removeNode('polyfill-script');
      (window as any).main.boot();
      load('ca-script');
      load('stat-script');
    } else {
      load('polyfill-script', function() {
        (window as any).main.boot();
        load('ca-script');
        load('stat-script');
      });
    }
  } else if (window.Promise && window.fetch) {
    removeNode('polyfill-script');
    load('main-script', function() {
      (window as any).main.boot();
      load('ca-script');
      load('stat-script');
    });
  } else {
    load('polyfill-script', function() {
      load('main-script', function() {
        (window as any).main.boot();
        load('ca-script');
        load('stat-script');
      });
    });
  }
})();
