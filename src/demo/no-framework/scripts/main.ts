import { ReceiveFormComponent } from '../components/register-form';
import { SwiperComponent } from '../../../common/components/swiper/index';
import { DialogComponent } from '../../../common/components/dialog/index';
import { $, $$, closest, addClass, removeClass } from '../../../common/scripts/base/dom';
import { lazyLoadImg } from '../../../common/scripts/base/utils';
import dialogTpl from '../templates/dialog.tpl.html';
import '../styles/index.scss';

class App implements Application {
  private initPart1():void {
    new ReceiveFormComponent(
      '#register-form-component-1',
    ).init();
  }

  private initPart4():void {
    let ref:NodeJS.Timeout = null;
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
    $('.part-4 > .slide-nav').addEventListener('click', function(evt:Event) {
      clearInterval(ref);
      const i = parseInt((evt.target as HTMLElement).getAttribute('data-index'));
      swiper.slideTo(i);
    });
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
    ).init();
  }

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
        $('#dialog-component-1 .dialog-content').innerHTML = dialogTpl.render({
          enquiry: true,
          part: '注册弹窗',
          parents: 1000,
        });
        dialogFormComponent = new ReceiveFormComponent(
          '#register-form-component-dialog',
        ).init();
        dialog.open();
      },
      false,
    );
  }

  boot():void {
    lazyLoadImg();
    this.initPart1();
    this.initPart4();
    this.initPart5();
    this.initPart6();
    this.initDialog();
  };
}

export default new App();
