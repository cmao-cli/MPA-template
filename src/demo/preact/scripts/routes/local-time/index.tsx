import * as preact from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../../actions';
import { TimeComponent } from '../../components/time';

type LocalTimeComponentProps = {
  localTime:number;
  updateLocalTime():void;
};

class RouteComponent extends preact.Component<LocalTimeComponentProps> {
  constructor(props:LocalTimeComponentProps) {
    super(props);
  }

  render():preact.JSX.Element {
    const { localTime, updateLocalTime } = this.props;
    return (
      <preact.Fragment>
        <div>
          Local Time: <TimeComponent time={localTime} />
        </div>
        <button onClick={updateLocalTime}>Update Local Time</button>
      </preact.Fragment>
    );
  }
}

export const LocalTimeComponent = connect('localTime', actions)(RouteComponent);
