/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: Todolist', () => {
  beforeEach(() => {
    addProviders([AppComponent]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));

  xit('should have as title \'app works!\'',
    inject([AppComponent], (app: AppComponent) => {
      expect(app.title).toEqual('organiZr');
    }));
});
