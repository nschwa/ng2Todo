/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestComponentBuilder, addProviders, beforeEachProviders, async, inject } from '@angular/core/testing';
import { TodoInputComponent } from './todo-input.component';
import { LocalTodoStoreService } from './../local-todo-store.service';

describe('Component: TodoInput', () => {
  let tcb;
  let ltss;


  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    LocalTodoStoreService,
    TodoInputComponent
  ]);

  // injection into every it case
  beforeEach(inject([TestComponentBuilder, LocalTodoStoreService], (_tcb, _ltss) => {
    tcb = _tcb
    ltss = _ltss
  }));

  it('should create an instance', () => {
    let component = new TodoInputComponent(ltss);
    expect(component).toBeTruthy();
  });

  describe('Function: save()', () => {
    beforeEach(() => {
      localStorage.clear();
      let mock = JSON.stringify([
        { id: 1, task: "1st", checked: false, created: new Date }
      ]);
      localStorage.setItem('todoStore', mock);

      console.info(localStorage);
    });


    it('should be defined', done => {
      tcb.createAsync(TodoInputComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        expect(component.save).toBeDefined();
        done();
      })
      .catch(e => done.fail(e));
    });


    it('should save a new todo', done => {
      tcb.createAsync(TodoInputComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        spyOn(localStorage, 'setItem');
        console.log('\n\n', component.newTodo);
        component.newTodo.task = "A Completely new todo!";
        console.log('\n\n', component.newTodo);
        fixture.detectChanges(); //trigger change detection
        component.save();
        fixture.detectChanges(); //trigger change detection
        expect(localStorage.setItem).toHaveBeenCalled();
        done();
      })
      .catch(e => done.fail(e));
    });


    it('should save a new todo only if input is given', done => {
      tcb.createAsync(TodoInputComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        spyOn(localStorage, 'setItem');
        component.save();
        fixture.detectChanges(); //trigger change detection
        expect(localStorage.setItem).not.toHaveBeenCalled();
        done();
      })
      .catch(e => done.fail(e));
    });


  });
});
