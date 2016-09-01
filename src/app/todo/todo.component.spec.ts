/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestComponentBuilder, addProviders, beforeEachProviders, async, inject } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { Todo } from './todo';
import { LocalTodoStoreService } from './../local-todo-store.service';

describe('Component: Todo', () => {
  let tcb;
  let ltss;

  //setup
  beforeEachProviders(() => [
    TestComponentBuilder,
    LocalTodoStoreService,
    TodoComponent
  ]);


  beforeEach(inject([TestComponentBuilder, LocalTodoStoreService], (_tcb, _ltss) => {
    tcb = _tcb;
    ltss = _ltss;
  }));


  it('should create an instance', () => {
    let component = new TodoComponent(ltss);
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
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;
      component.todo = todo;
      fixture.detectChanges(); //trigger change detection

      // expect(element.innerHTML).toContain(todo.id);
      expect(element.innerHTML).toContain(todo.task);
      // expect(element.innerHTML).toContain(todo.created);
      done();
    })
    .catch(e => done.fail(e));
  });



  it('should render a checkbox', done => {
    let todo = new Todo(1337, "Learning Angular", true, new Date());
    tcb.createAsync(TodoComponent).then(fixture => {
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;
      component.todo = todo;
      expect(element.querySelectorAll('input[type="checkbox"]').length).not.toBe(0);
      done();
    })
    .catch(e => done.fail(e));
  });



  it('should have a .checked class if checked', done => {
    let todo = new Todo(1337, "Learning Angular", true, new Date());
    tcb.createAsync(TodoComponent).then(fixture => {
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;
      component.todo = todo;
      fixture.detectChanges(); //trigger change detection
      expect(element.childNodes[0].classList.contains('checked')).toBeTruthy();
      component.todo.checked = false;
      fixture.detectChanges(); //trigger change detection
      expect(element.childNodes[0].classList.contains('checked')).toBeFalsy();
      done();
    })
    .catch(e => done.fail(e));
  });



  describe('Function: onEdit() (called when user clicks on task)', () => {
    it('should be defined', (done) => {
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        expect(component.onEdit).not.toBeUndefined();
        done();
      })
      .catch(e => done.fail(e));
    })


    it('should transform task field into an input field', (done) => {
      let todo = new Todo(1337, "Learning Angular", true, new Date());
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        component.todo = todo;
        component.onEdit();
        fixture.detectChanges();
        expect(element.querySelectorAll('.task').length).toBe(0);
        expect(element.querySelectorAll('input[type="text"]').length).toBe(1);
        expect(element.querySelectorAll('input[type="text"]')[0].value).toEqual(todo.task);
        done();
      })
      .catch(e => done.fail(e));
    })
  })


  describe('Function: onBlur() (called when user leaves input field)', () => {
    it('should be defined', (done) => {
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        expect(component.onBlur).not.toBeUndefined();
        done();
      })
      .catch(e => done.fail(e));
    })


    it('should hide the input field', (done) => {
      let todo = new Todo(1337, "Learning Angular", true, new Date());
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;

        component.todo = todo;
        component.onEdit();

        fixture.detectChanges();
        element.querySelectorAll('input[type="text"]')[0].value = "Edited";
        expect(element.querySelectorAll('.task').length).toBe(0);
        expect(element.querySelectorAll('input[type="text"]').length).toBe(1);

        component.onBlur();
        fixture.detectChanges();
        expect(element.querySelectorAll('.task').length).toBe(1);
        expect(element.querySelectorAll('input[type="text"]').length).toBe(0);


        done();
      })
      .catch(e => done.fail(e));
    })
  })


  describe('Function: onChecked()', () => {
    it('should be defined', (done) => {
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        expect(component.onChecked).not.toBeUndefined();
        done();
      })
      .catch(e => done.fail(e));
    })


    it('should change todo checked state and save in localStorage', (done) => {
      let todo = new Todo(1337, "Learning Angular", true, new Date());
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        spyOn(localStorage, 'setItem');
        component.todo = todo;
        component.onChecked();
        fixture.detectChanges();
        expect(component.todo.checked).toBeFalsy();
        expect(localStorage.setItem).toHaveBeenCalled();
        done();
      })
      .catch(e => done.fail(e));
    })
  })



  describe('Function: onDelete()', () => {
    it('should be defined', (done) => {
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        expect(component.onDelete).not.toBeUndefined();
        done();
      })
      .catch(e => done.fail(e));
    })


    it('should call to localStorage', (done) => {
      let todo = new Todo(1337, "Learning Angular", true, new Date());
      tcb.createAsync(TodoComponent).then(fixture => {
        let component = fixture.componentInstance;
        let element = fixture.nativeElement;
        spyOn(localStorage, 'setItem');
        component.todo = todo;
        component.onDelete();
        expect(localStorage.setItem).toHaveBeenCalled();
        done();
      })
      .catch(e => done.fail(e));
    })
  })
});
