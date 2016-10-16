import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'angular2-apollo';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { githubToken } from '../../config.secret';
import { StoreModule } from './store';


const networkInterface = createNetworkInterface('https://api.github.com/graphql');
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['authorization'] = `bearer ${githubToken}`;
    next();
  }
}]);
const client = new ApolloClient({ networkInterface });


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.withClient(client),
    StoreModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
