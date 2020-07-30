import { Component } from '../../../../common/scripts/base/component';
import { addClass, removeClass } from '../../../../common/scripts/base/dom';
import mainTpl from './index.tpl.html';

export interface FormData {
  mobile:string;
  code:string;
  age:string;
  nickname:string;
}

export interface ReceiveFormOptions {
  submitBtnLabel?:string;
}

type countDownCallback = (n:number) => void;

export class ReceiveFormComponent extends Component {
  constructor(
    selector:string,
    private options:ReceiveFormOptions = {
      submitBtnLabel: '免费领取',
    },
  ) {
    super(selector, mainTpl);
  }

  protected render():void {
    super.render({
      ...this.options,
    });
  }

  private getMobile():string {
    const mobileInput = this.$('.mobile-input') as HTMLInputElement;
    return mobileInput.value.trim();
  }

  private checkPhoneNumber(phoneNumber:string):boolean {
    return phoneNumber.length === 11 && /^1[3456789]\d{9}$/.test(phoneNumber);
  }

  private verifyMobileInput():boolean {
    const value = this.getMobile();
    if (!this.checkPhoneNumber(value)) {
      this.showError('请填写正确的手机号');
      return false;
    }
    return true;
  }

  private startCountDown(seconds:number, cb:countDownCallback):void {
    if (seconds > 0) {
      setTimeout(() => {
        this.startCountDown(--seconds, cb);
      }, 1000);
      cb(seconds);
    } else {
      cb(0);
    }
  }

  checkNumberInput(evt:KeyboardEvent):void {
    const code = evt.keyCode;
    if ((code < 48 || code > 57) && code !== 8) {
      evt.preventDefault();
    }
  }

  checkAgeSelect(evt:InputEvent):void {
    const target = evt.target as HTMLSelectElement;
    if (target.value !== '0') {
      target.style.color = '#333';
    } else {
      target.style.color = '#fec833';
    }
  }

  showError(msg:string):void {
    const msgbox = this.$('.msgbox');
    removeClass(msgbox, 'anim');
    msgbox.clientWidth;
    msgbox.innerHTML = msg;
    addClass(msgbox, 'anim');
  }

  async onGetCodeBtnClick():Promise<void> {
    if (!this.verifyMobileInput()) {
      return;
    }
    // TODO
  }

  async onSubmitBtnClick():Promise<void> {
    if (!this.verifyMobileInput()) {
      return;
    }
    // TODO
  }

  toggleSubmitBtn(enable:boolean):void {
    const btn = this.$('.btn-submit') as HTMLButtonElement;
    if (enable) {
      btn.disabled = false;
      removeClass(btn, 'disabled');
    } else {
      btn.disabled = true;
      addClass(btn, 'disabled');
    }
  }

  onCheckboxChange(evt:MouseEvent):void {
    const checkbox = evt.target as HTMLInputElement;
    if (checkbox.checked) {
      this.toggleSubmitBtn(true);
      addClass(checkbox.parentNode as Element, 'checked');
    } else {
      this.toggleSubmitBtn(false);
      removeClass(checkbox.parentNode as Element, 'checked');
    }
  }

  init():ReceiveFormComponent {
    super.init();
    return this;
  }
}
