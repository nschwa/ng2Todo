/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestComponentBuilder, addProviders, beforeEachProviders, async, inject } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { Todo } from './todo';

describe('Component: Todo', () => {
  let tcb;

  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    TodoComponent
  ]);


  beforeEach(inject([TestComponentBuilder], _tcb => {
    tcb = _tcb
  }));


  it('should create an instance', () => {
    let component = new TodoComponent();
    expect(component).toBeTruthy();
  });


  // it('should have a todo property', () => {
  //   let component = new TodoComponent();
  //   expect(component.todo).toBeDefined();
  // });


  // specs
  it('should render out given content', done => {
    let todo = new Todo(1337, "Learning Angular", false, new Date());
    tcb.createAsync(TodoComponent).then(fixture => {
      console.log(fixture);
      let todoCmp = fixture.componentInstance;
      let element = fixture.nativeElement;
      todoCmp.todo = todo;
      fixture.detectChanges(); //trigger change detection

      expect(element.innerHTML).toContain(todo.id);
      expect(element.innerHTML).toContain(todo.task);
      expect(element.innerHTML).toContain(todo.created);
      expect(element.innerHTML).toContain(todo.checked);
      done();
    })
    .catch(e => done.fail(e));
  });



  it('should (not) be scored out when (not) checked', done => {
    let todo = new Todo(1337, "Learning Angular", true, new Date());
    tcb.createAsync(TodoComponent).then(fixture => {
      let todoCmp = fixture.componentInstance;
      let element = fixture.nativeElement;
      todoCmp.todo = todo;
      fixture.detectChanges(); //trigger change detection
      expect(element.childNodes[0].style.textDecoration).toBe('line-through');
      todoCmp.todo.checked = false;
      fixture.detectChanges(); //trigger change detection
      expect(element.childNodes[0].style.textDecoration).not.toBe('line-through');
      done();
    })
    .catch(e => done.fail(e));
  });

});
