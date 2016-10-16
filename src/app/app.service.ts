import { Injectable } from '@angular/core';
import { Angular2Apollo } from 'angular2-apollo';
import gql from 'graphql-tag';

import { environment } from '../environments/environment';
import { Dispatcher, Action, RequestViewerAction, ViewerState } from './store';


const CurrentViewerQuery = gql`
  query {
    viewer {
      name
      login
    }
  }
`;


@Injectable()
export class AppService {
  constructor(
    private dispatcher$: Dispatcher<Action>,
    private apollo: Angular2Apollo,
  ) { }


  requestViewer(): void {
    console.time('requestViewer');
    this.apollo
      .watchQuery({ query: CurrentViewerQuery })
      .take(1)
      .subscribe(result => {
        if (!environment.production) {
          console.log('result:', result);
        }
        const viewer = result.data.viewer as ViewerState;
        this.dispatcher$.next(new RequestViewerAction(viewer));
      }, err => console.error(err), () => console.timeEnd('requestViewer'));
  }

}
