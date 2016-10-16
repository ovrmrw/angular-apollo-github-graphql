import { Dispatcher, StateReducer } from './common';
import { Action, RequestViewerAction } from './actions';
import { ViewerState } from './types';


export const viewerStateReducer: StateReducer<ViewerState> =
  (initState: ViewerState, dispatcher$: Dispatcher<Action>) =>
    dispatcher$.scan<ViewerState>((state, action) => {
      if (action instanceof RequestViewerAction) {
        return action.viewer;
      } else {
        return state;
      }
    }, initState);
