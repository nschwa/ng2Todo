/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestComponentBuilder, addProviders, beforeEachProviders, async, inject } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TODOS } from './todomocks';
import { LocalTodoStoreService } from './../local-todo-store.service';

describe('Component: TodoList', () => {
  let tcb;
  let ltss;


  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    LocalTodoStoreService,
    TodoListComponent
  ]);

  // injection into every it case
  beforeEach(inject([TestComponentBuilder, LocalTodoStoreService], (_tcb, _ltss) => {
    tcb = _tcb,
    ltss = _ltss
  }));

  // before each test fill localStorage with mock data
  beforeEach(() => {
    let todoData = JSON.stringify(TODOS);
    localStorage.setItem('todoStore', todoData);
  })

  // Is component there
  it('should create an instance', () => {
    let component = new TodoListComponent(ltss);
    expect(component).toBeTruthy();
  });


  // Content
  // specs
  it('should contain a list of todos', done => {
    tcb.createAsync(TodoListComponent).then(fixture => {
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;
      fixture.detectChanges(); //trigger change detection
      expect(element.querySelectorAll('app-todo').length).toBe(3);
      done();
    })
    .catch(e => done.fail(e));
  });


  it('should contain a todo input field', done => {
    tcb.createAsync(TodoListComponent).then(fixture => {
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;
      console.log(component);
      fixture.detectChanges(); //trigger change detection
      expect(element.querySelectorAll('app-todo-input').length).toBe(1);
      expect(element.querySelectorAll('#todo-input-field').length).toBe(1);
      done();
    })
    .catch(e => done.fail(e));
  });

});
