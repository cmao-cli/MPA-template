import * as preact from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../../actions';
import { TimeComponent } from '../../components/time';

type ServerTimeComponentProps = {
  serverTime:number;
  updateServerTime():void;
};

class RouteComponent extends preact.Component<ServerTimeComponentProps> {
  constructor(props:ServerTimeComponentProps) {
    super(props);
  }

  render():preact.JSX.Element {
    const { serverTime, updateServerTime } = this.props;
    return (
      <preact.Fragment>
        <div>
          Server Time: <TimeComponent time={serverTime} />
        </div>
        <button onClick={updateServerTime}>Update Server Time</button>
      </preact.Fragment>
    );
  }
}

export const ServerTimeComponent = connect('serverTime', actions)(RouteComponent);
