import { setInteractive } from '@mlz/perf-report';
import { ReceiveFormComponent, FormData } from '../../common/components/register-form';
import { SwiperComponent } from '../../common/components/swiper/index';
import { DialogComponent } from '../../common/components/dialog/index';
import { $, $$, closest, addClass, removeClass } from '../../common/scripts/base/dom';
import dialogTpl from '../templates/dialog.tpl.html';
import {
  lazyLoadImg,
  alwaysScrollTop,
  dataConfig,
  abTest,
} from '../../common/scripts/base/utils';
import { initWechat, wxShare } from '../../common/scripts/base/wechat';
import { caInit } from '../../common/scripts/base/ca';
import '../styles/index.scss';

class App implements Application {
  private successTips:DialogComponent;
  constructor() {
    // 进入页面自动滚动顶部
    alwaysScrollTop();
    // 针对有data-src属性的html元素开启懒加载
    lazyLoadImg();
  }

  // 表单通过验证后的提交逻辑
  private async requestFinalResult(data:FormData):Promise<any> {
    this.successAction();
  }

  // 注册成功提示
  private successAction():void {
    this.successTips.open();
  }

  // 配置微信分享
  private async initWx():Promise<void> {
    await initWechat();
    wxShare({
      title: '您有一节价值258元编程猫体验课待领取',
      desc: '编程猫帮助提升数学思维，3147万中国孩子都在学',
      link: location.href,
      imgUrl: 'https://static-k12edu.codemao.cn/mobile-codemao/wechat_share_v5.png',
    });
  }

  private initPart1():void {
    // 实例化表单组件
    new ReceiveFormComponent(
      '#register-form-component-1',
      async(data, component) => {
        component.toggleSubmitBtn(false);
        const errMsg = await this.requestFinalResult(data);
        component.toggleSubmitBtn(true);
        if (errMsg) {
          component.showError(errMsg);
        }
      },
      {
        // 传入自定义数据
        part: 'part1',
      },
    ).init();
  }

  private initPart4():void {
    let ref:NodeJS.Timeout = null;
    // 实例化轮播组件
    const swiper = new SwiperComponent(
      '#swiper-component-1',
      () => {
        clearInterval(ref);
      },
      (i) => {
        $$('.part-4 > .slide-nav li').forEach((el:Element) => {
          if (el.getAttribute('data-index') === i.toString()) {
            addClass(el, 'active');
          } else {
            removeClass(el, 'active');
          }
        });
      },
    ).init();
    // 轮播指示器点击切换轮播
    $('.part-4 > .slide-nav').addEventListener('click', function(evt:Event) {
      clearInterval(ref);
      const i = parseInt((evt.target as HTMLElement).getAttribute('data-index'));
      swiper.slideTo(i);
    });
    // 自动轮播
    let i = 0;
    ref = setInterval(() => {
      swiper.slideTo(++i % swiper.slides);
    }, 3000);
  }

  private initPart5():void {
    let ref:NodeJS.Timeout = null;
    const swiper = new SwiperComponent(
      '#swiper-component-2',
      () => {
        clearInterval(ref);
      },
      (i) => {
        $$('.part-5 > .slide-nav li').forEach((el:Element) => {
          if (el.getAttribute('data-index') === i.toString()) {
            addClass(el, 'active');
          } else {
            removeClass(el, 'active');
          }
        });
      },
    ).init();
    $('.part-5 > .slide-nav').addEventListener('click', function(evt:Event) {
      clearInterval(ref);
      const i = parseInt((evt.target as HTMLElement).getAttribute('data-index'));
      swiper.slideTo(i);
    });
    let i = 0;
    ref = setInterval(() => {
      swiper.slideTo(++i % swiper.slides);
    }, 3000);
  }

  private initPart6():void {
    new ReceiveFormComponent(
      '#register-form-component-2',
      async(data, component) => {
        component.toggleSubmitBtn(false);
        const errMsg = await this.requestFinalResult(data);
        component.toggleSubmitBtn(true);
        if (errMsg) {
          component.showError(errMsg);
        }
      },
      {
        part: 'part6',
      },
    ).init();
  }
  // 弹窗表单组件
  private initDialog():void {
    let dialogFormComponent:ReceiveFormComponent;
    const dialog = new DialogComponent('#dialog-component-1', function() {
      dialogFormComponent && dialogFormComponent.destroy();
    }).init();
    document.getElementById('page-containner').addEventListener(
      'click',
      (evt) => {
        if (closest(evt.target, '.register-form-component, .dialog-component, .slide-nav', true)) {
          return;
        }
        const enquiry = !!closest(evt.target, '[data-enquiry]', true);
        $('#dialog-component-1 .dialog-content').innerHTML = dialogTpl.render({
          enquiry: enquiry,
          part: '注册弹窗',
          parents: dataConfig.parents,
        });
        dialogFormComponent = new ReceiveFormComponent(
          '#register-form-component-dialog',
          async(data, component) => {
            component.toggleSubmitBtn(false);
            const errMsg = await this.requestFinalResult(data);
            component.toggleSubmitBtn(true);
            if (errMsg) {
              component.showError(errMsg);
            }
          },
          {
            submitBtnLabel: enquiry ? '接收课程价格' : '',
            part: '注册弹窗',
            isRegister: abTest() === 'v7-register-b',
          },
        ).init();
        dialog.open();
      },
      false,
    );
  }

  private initDialog2():void {
    const dialog = new DialogComponent('#dialog-component-2').init();
    this.successTips = dialog;
  }

  boot = async():Promise<void> => {
    caInit();
    this.initPart1();
    this.initPart4();
    this.initPart5();
    this.initPart6();
    this.initDialog();
    this.initDialog2();
    this.initWx();
    setInteractive();
  };
}

export default new App();
