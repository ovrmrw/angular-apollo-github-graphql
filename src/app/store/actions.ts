import { ViewerState } from './types';


export class RequestViewerAction {
  constructor(public viewer: ViewerState) { }
}


export type Action = RequestViewerAction;
