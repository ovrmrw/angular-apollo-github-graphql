import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Dispatcher, Provider, ReducerContainer } from './common';
import { Action } from './actions';
import { viewerStateReducer } from './reducers';
import { AppState } from './types';


const initialState: AppState = {
  viewer: {
    name: '',
    login: ''
  }
};


@Injectable()
export class Store {
  readonly provider$: Provider<AppState>;

  constructor(
    private dispatcher$: Dispatcher<Action>
  ) {
    this.provider$ = new BehaviorSubject(initialState);
    this.combineReducers();
  }


  private combineReducers(): void {
    ReducerContainer
      .zip<AppState>(...[
        viewerStateReducer(initialState.viewer, this.dispatcher$),

        (viewer): AppState => {
          return Object.assign<{}, AppState, {}>({}, initialState, { viewer });
        }
      ])
      .subscribe(newState => {
        console.log('newState:', newState);
        this.provider$.next(newState);
      });
  }


  getState(): Observable<AppState> {
    return this.provider$.asObservable()
      // .do(() => console.log('provider'))
      .share();
  }

}
