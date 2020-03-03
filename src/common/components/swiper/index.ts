import { Component } from '../../scripts/base/component';

type swiperCallback = (i:number) => void;

export class SwiperComponent extends Component {
  private wrapper:HTMLElement;
  private touchStartListener:EventListener = this.onTouchStart.bind(this);
  private touchMoveListener:EventListener = this.onTouchMove.bind(this);
  private touchEndListener:EventListener = this.onTouchEnd.bind(this);
  private touchCancelListener:EventListener = this.onTouchCancel.bind(this);
  private touching = false;
  private clientWidth:number;
  private slidesAmount:number;
  private startPageX:number;
  private startPageY:number;
  private lastPageX:number;
  private lastPageY:number;
  private startTime:number;
  private startTranslateX:number;
  private translateX = 0;
  private index = 0;

  constructor(selector:string, private startSwipeCb?:swiperCallback | null, private endSwipeCb?:swiperCallback | null) {
    super(selector);
    this.wrapper = this.$('.swiper-wrapper') as HTMLElement;
  }

  destroy():void {
    this.container.removeEventListener('touchstart', this.touchStartListener);
    this.container.removeEventListener('touchmove', this.touchMoveListener);
    this.container.removeEventListener('touchend', this.touchEndListener);
    this.container.removeEventListener('touchcancel', this.touchCancelListener);
    super.destroy();
  }

  private finishTouch():void {
    this.touching = false;
    let i = -this.translateX / this.clientWidth;
    const duration = new Date().getTime() - this.startTime;
    if (duration < 300 && Math.abs(this.lastPageX - this.startPageX) > 20) {
      if (i > this.index && i < this.index + 1) {
        i = this.index + 1;
      } else if (i < this.index && i > this.index - 1) {
        i = this.index - 1;
      } else {
        i = Math.round(i);
      }
    } else {
      i = Math.round(i);
    }
    if (i < 0) {
      i = 0;
    } else if (i > this.slidesAmount - 1) {
      i = this.slidesAmount - 1;
    }
    this.slideTo(i);
  }

  private onTouchStart(evt:TouchEvent):void {
    if (this.touching) {
      this.finishTouch();
      return;
    }
    const touch = evt.targetTouches[0];
    this.touching = true;
    this.startPageX = touch.pageX;
    this.startPageY = touch.pageY;
    this.lastPageX = touch.pageX;
    this.lastPageY = touch.pageY;
    this.startTranslateX = this.translateX;
    this.startTime = new Date().getTime();
    this.wrapper.style.transitionDuration = '0s';
    this.startSwipeCb && this.startSwipeCb(this.index);
  }

  private onTouchMove(evt:TouchEvent):void {
    const touch = evt.targetTouches[0];
    const pageX = touch.pageX;
    const pageY = touch.pageY;
    let moveX = pageX - this.startPageX;
    const moveY = pageY - this.startPageY;
    if (!this.touching || this.startPageX === this.lastPageX && this.startPageY === this.lastPageY && Math.abs(moveY) > Math.abs(moveX)) {
      this.finishTouch();
      return;
    }
    evt.preventDefault();
    this.lastPageX = pageX;
    this.lastPageY = pageY;
    if (this.index === 0 && moveX > 0 || this.index === (this.slidesAmount - 1) && moveX < 0) {
      moveX /= 2;
    }
    const translateX = this.startTranslateX + moveX;
    this.wrapper.style.transform = `translate(${translateX}px)`;
    this.translateX = translateX;
  }

  private onTouchEnd():void {
    this.finishTouch();
  }

  private onTouchCancel():void {
    this.finishTouch();
  }

  get slides():number {
    return this.slidesAmount;
  }

  get currentIndex():number {
    return this.index;
  }

  slideTo(i:number):void {
    i = Math.floor(i);
    if (i < 0 || i >= this.slidesAmount) {
      return;
    }
    const translateX = -i * this.clientWidth;
    this.wrapper.style.transitionDuration = '.2s';
    this.wrapper.style.transform = `translate(${translateX}px)`;
    this.translateX = translateX;
    this.index = i;
    this.endSwipeCb && this.endSwipeCb(i);
  }

  init():SwiperComponent {
    super.init();
    this.clientWidth = this.container.clientWidth;
    this.slidesAmount = this.$$('.swiper-slide').length;
    this.container.addEventListener('touchstart', this.touchStartListener);
    this.container.addEventListener('touchmove', this.touchMoveListener);
    this.container.addEventListener('touchend', this.touchEndListener);
    this.container.addEventListener('touchcancel', this.touchCancelListener);
    return this;
  }
}
