/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestComponentBuilder, addProviders, beforeEachProviders, async, inject } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';


describe('Component: TodoList', () => {
  let tcb;


  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    TodoListComponent
  ]);

  // injection into every it case
  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb
  }));


  // Is component there
  it('should create an instance', () => {
    let component = new TodoListComponent();
    expect(component).toBeTruthy();
  });


  // Content
  // specs
  it('should contain a list of todos', done => {
    tcb.createAsync(TodoListComponent).then(fixture => {
      console.log(fixture);
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      expect(element.querySelectorAll('app-todo').length).toBe(3);
      done();
    })
    .catch(e => done.fail(e));
  });
});
