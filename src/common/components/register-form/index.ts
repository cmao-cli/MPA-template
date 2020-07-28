import { Component } from '../../scripts/base/component';
import { addClass, removeClass } from '../../scripts/base/dom';
import { checkPhoneNumber } from '../../scripts/base/utils';
import mainTpl from './index.tpl.html';

export interface FormData {
  mobile:string;
  code:string;
  age:string;
  nickname:string;
}

export interface ReceiveFormOptions {
  submitBtnLabel?:string;
  part?:string;
  page?:string;
  isRegister?:boolean;
  phonePlaceholder?:string;
  codePlaceholder?:string;
  isReferralRegiste?:boolean;
}

type countDownCallback = (n:number) => void;
type submitCallback = (d:FormData, c:ReceiveFormComponent) => void;

export class ReceiveFormComponent extends Component {
  constructor(
    selector:string,
    private submitCb:submitCallback,
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

  private verifyMobileInput():boolean {
    const value = this.getMobile();
    if (!checkPhoneNumber(value)) {
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

  async requestCode(mobile:string):Promise<any> {
    try {
      // 发送验证码逻辑，模拟返回成功
      return ;
    } catch (err) {
      return '图形验证码失效，请重试';
    }
  }

  async onGetCodeBtnClick():Promise<void> {
    if (!this.verifyMobileInput()) {
      return;
    }
    const btn = this.$('.code-section > button') as HTMLButtonElement;
    btn.innerHTML = '正在获取...';
    btn.disabled = true;
    addClass(btn, 'disabled');
    this.showError('');

    function restoneBtn():void {
      btn.removeAttribute('disabled');
      btn.innerHTML = '获取验证码';
      removeClass(btn, 'disabled');
    }
    const errMsg = await this.requestCode(this.getMobile());
    if (errMsg === false) {
      restoneBtn();
      return;
    }

    if (errMsg) {
      this.showError(errMsg);
      restoneBtn();
      return;
    }
    this.startCountDown(60, function(n) {
      if (n > 0) {
        btn.innerHTML = `${n}秒后重新发送`;
      } else {
        restoneBtn();
      }
    });
  }

  async onSubmitBtnClick():Promise<void> {
    const params:any = {};

    if (!this.verifyMobileInput()) {
      return;
    }
    const codeInput = this.$('.code-input') as HTMLInputElement;
    const code = codeInput.value.trim();
    if (code.length !== 6) {
      this.showError('请输入6位验证码');
      codeInput.focus();
      return;
    }

    this.showError('');
    const mobile = this.getMobile();
    params.mobile = mobile;
    params.code = code;
    this.submitCb(params, this);
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
