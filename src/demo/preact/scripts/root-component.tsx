import * as preact from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';
import { Provider } from 'unistore/preact';
import { store } from './store';
import { LocalTimeComponent } from './routes/local-time';
import { ServerTimeComponent } from './routes/server-time';

export class RootComponent extends preact.Component {
  render():preact.JSX.Element {
    return (
      <Provider store={store}>
        <preact.Fragment>
          <nav>
            <Link activeClassName="active" href="/demo/preact/">
              Local Time
            </Link>{' '}
            <Link activeClassName="active" href="/demo/preact/server-time/">
              Server Time
            </Link>
          </nav>
          <Router>
            <LocalTimeComponent path="/demo/preact/" />
            <ServerTimeComponent path="/demo/preact/server-time/" />
          </Router>
        </preact.Fragment>
      </Provider>
    );
  }
}
