import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppService } from './app.service';
import { Store, AppState } from './store';


@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <pre>{{state | async | json}}</pre>
    <div>
      <button (click)="requestViewer()">Request Viewer</button>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private service: AppService,
    private store: Store,
  ) { }


  requestViewer(): void {
    this.service.requestViewer();
  }

  get state(): Observable<AppState> { return this.store.getState(); }

}
