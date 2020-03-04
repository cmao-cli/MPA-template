import simpleTpl from '../templates/simple.tpl.html';

class App implements Application {
  constructor() {
    console.log('Using basic template!');
  }

  // 执行函数
  boot = async():Promise<void> => {
    const el = document.getElementsByClassName('tpl')[0];
    el.innerHTML = simpleTpl.render({ test: 'injected simpleTpl!' });
  };
}

export default new App();
