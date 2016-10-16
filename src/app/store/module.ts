import { NgModule } from '@angular/core';

import { Dispatcher } from './common';
import { Store } from './store';


@NgModule({
  providers: [Dispatcher, Store],
})
export class StoreModule { }
