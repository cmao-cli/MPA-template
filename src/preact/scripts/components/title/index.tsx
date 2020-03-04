import * as preact from 'preact';

type TitleProps = {
  content:string;
}
export const Title = (props:TitleProps) => (<div className="title">{props.content}</div>);
