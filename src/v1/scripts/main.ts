// import simpleTpl from '../templates/simple.tpl.html';

class App implements Application {
  constructor() {
    console.log('constructor');
  }

  private log() {
    console.log(22222);
  }

  boot = async():Promise<void> => {
    // const el = document.getElementsByClassName('v1')[0];
    this.log();
    // el.innerHTML = simpleTpl.render({ test: '哈哈 v1' });
  };
}

export default new App();
