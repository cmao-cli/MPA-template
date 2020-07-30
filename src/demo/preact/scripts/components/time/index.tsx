import * as preact from 'preact';
import './index.scss';

type TimeComponentProps = {
  time:number;
};

export class TimeComponent extends preact.Component<TimeComponentProps> {
  render():preact.JSX.Element {
    return <span className="time-component">{(this.props.time && new Date(this.props.time).toISOString()) || ''}</span>;
  }
}
