import * as preact from 'preact';
import { RootComponent } from './root-component';
import '../styles/index.scss';

class App implements Application {
  boot():void {
    const container = document.getElementById('page-containner');
    container.innerHTML = '';
    preact.render(preact.createElement(RootComponent, {}), container);
  }
}

export default new App();
