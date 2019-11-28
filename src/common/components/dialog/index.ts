import {Component} from '../../scripts/base/component';
import {addClass, removeClass, closest} from '../../scripts/base/dom';

type closeCallback = () => void;

export class DialogComponent extends Component {
  private wrapper: Element;
  private closeBtn: Element;
  private containerClickEventListener: EventListener = (evt) => {
    if (!closest(evt.target, '.dialog-wrapper', true)) {
      this.close();
    }
  };

  private closeBtnEventListener: EventListener = this.close.bind(this);

  constructor(selector: string, private closeCb?: closeCallback) {
    super(selector);
    this.wrapper = this.$('.dialog-wrapper');
    this.closeBtn = this.$('.dialog-close-btn');
  }

  destroy(): void {
    this.container.removeEventListener('click', this.containerClickEventListener);
    this.closeBtn.removeEventListener('click', this.closeBtnEventListener);
    this.wrapper = null;
    this.closeBtn = null;
    super.destroy();
  }

  init(): DialogComponent {
    super.init();
    this.container.addEventListener('click', this.containerClickEventListener);
    this.closeBtn.addEventListener('click', this.closeBtnEventListener);
    return this;
  }

  open(): DialogComponent {
    addClass(this.container, 'active');
    this.container.clientWidth;
    addClass(this.wrapper, 'active');
    addClass(document.body, 'dialog-active');
    return this;
  }

  close(): DialogComponent {
    removeClass(document.body, 'dialog-active');
    removeClass(this.container, 'active');
    removeClass(this.wrapper, 'active');
    this.closeCb && this.closeCb();
    return this;
  }
}
