
declare const window:any;
import { $$ } from './dom';

// passive兼容
let passiveOption:boolean | { passive:boolean } = false;
try {
  const options = {
    get passive():void {
      // This function will be called when the browser
      // attempts to access the passive property.
      passiveOption = { passive: true };
      return;
    },
  };
  window.addEventListener('test', options, options);
  window.removeEventListener('test', options, options);
} catch (err) {
  passiveOption = false;
}

export const lazyLoadImg = () => {
  const load = () => {
    if (window.scrollY === 0 && document.body.scrollTop === 0) {
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
  };
  window.addEventListener(
    'scroll',
    function lazyLoadListener():void {
      load();
      window.removeEventListener('scroll', lazyLoadListener);
    },
    passiveOption,
  );
  document.body.addEventListener(
    'scroll',
    function lazyLoadListener():void {
      load();
      document.body.removeEventListener('scroll', lazyLoadListener);
    },
    passiveOption,
  );
};
