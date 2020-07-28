import { G } from './global';
import { $ } from './dom';

export class Component {
  protected container:HTMLElement;
  protected inited = false;

  constructor(protected selector:string, protected mainTpl?:MicroTemplate) {
    this.container = $(selector);
    if (!this.container) {
      throw new Error(`Selector "${selector}" invalid!`);
    }

    if (G.__COMPONENTS__[selector]) {
      throw new Error(`Component for selector "${selector}" allready exist!`);
    }
    G.__COMPONENTS__[selector] = this;
  }

  destroy():void {
    this.container = null;
    G.__COMPONENTS__[this.selector] = null;
  }

  protected getState():Record<string, any> {
    return {};
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  protected restoreState(state:Record<string, any>):void {
    //
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  protected render($data?:Record<string, any>, $opt?:Record<string, any>):void {
    if (!this.mainTpl) {
      return;
    }
    this.container.innerHTML = this.mainTpl
      .render($data, $opt)
      .replace(/ data-(on\w+?)="this./g, ` $1="G.__COMPONENTS__['${this.selector}'].`);
  }

  init():Component {
    if (this.inited) {
      return;
    }

    if (this.container) {
      const state = this.getState();
      this.render();
      this.restoreState(state);
    }
    this.inited = true;
    return this;
  }

  $(selector:string):Element {
    if (!this.container) {
      return null;
    }
    return this.container.querySelector(selector);
  }

  $$(selector:string):NodeListOf<Element> {
    if (!this.container) {
      return null;
    }
    return this.container.querySelectorAll(selector);
  }
}
