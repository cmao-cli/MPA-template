import closestx from 'closest';

export const $ = document.querySelector.bind(document);

export const $$ = document.querySelectorAll.bind(document);

export function closest(element:Element | EventTarget, selector:string, checkYoSelf?:boolean):Element | null {
  return closestx(element, selector, checkYoSelf);
}

export function hasClass(el:Element, className:string):boolean {
  return el.className.split(/\s+/).some((c) => c === className);
}

export function addClass(el:Element, className:string):void {
  if (hasClass(el, className)) {
    return;
  }
  const oldClassName = el.className;
  el.className = oldClassName ? `${oldClassName } ${ className}` : className;
}

export function removeClass(el:Element, className:string):void {
  let has = false;
  const cs = el.className.split(/\s+/).filter((c) => {
    if (c === className) {
      has = true;
      return false;
    }
    return true;
  });
  if (has) {
    el.className = cs.join(' ');
  }
}
