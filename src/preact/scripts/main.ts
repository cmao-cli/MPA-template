import { render, h, createElement } from 'preact';
import { RootComponent } from './root';

class App implements Application {
  constructor() {
    console.log('Using Preact template!');
  }

  // 执行函数
  boot = async():Promise<void> => {
    const container = document.getElementById('preact');
    render(createElement(RootComponent, {}), container);
  }
}

export default new App();
