import * as preact from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

import { RouteA } from './routes/routeA';

export class RootComponent extends preact.Component {
  render():preact.VNode {
    return (
      <preact.Fragment>
        <Link activeClassName="active" href="/preact/routeA">
          routeA
        </Link>
        <Router>
          <RouteA path="/preact/routeA" />
        </Router>
        <div>
          <a href="/basic">
            &lt; back to basic
          </a>
        </div>
      </preact.Fragment>
    );
  }
}
