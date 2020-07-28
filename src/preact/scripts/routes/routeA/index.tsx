import * as preact from 'preact';
import { RouterProps } from 'preact-router';
import { Title } from '../../components/title';

export const RouteA = (props:RouterProps) => (<div className="routeA"><Title content="RouteA" /></div>);
