/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { LocalTodoStoreService } from './local-todo-store.service';
import { Todo } from './todo/todo';


describe('Service: LocalTodoStore', () => {
  const testTodo = new Todo(1001, "Testing", false, new Date());
  const testStoreKey = 'testStore';

  beforeEach(() => {
    addProviders([LocalTodoStoreService]);
  });

  beforeEach(() => {
    let testData = JSON.stringify([testTodo]);
    localStorage.setItem(testStoreKey, testData);
  });

  afterEach(() => {
    localStorage.clear();
  });

  // well
  it('should be defined',
    inject([LocalTodoStoreService],
      (service: LocalTodoStoreService) => {
        expect(service).not.toBeUndefined();
      }));


  // Does localStorage work?
  describe('Function: storageEnabled', () => {
    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.storageEnabled).not.toBeUndefined();
    }));

    it('should return true if localStorage is enabled', inject([LocalTodoStoreService], (service) => {
      expect(service.storageEnabled()).toBeTruthy();
    }));
  })



  // Expecting results for editing todos
  describe('Function: editTodo()', () => {

    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.editTodo).not.toBeUndefined();
    }));

    it('return a proper result object {message: \'success\', data: obj}', inject([LocalTodoStoreService], (service) => {
      let edited = testTodo;
      edited.task = edited.task + ' (EDITED)';

      let result = service.editTodo(edited.id, testStoreKey, edited);
      console.log('#########>>>>>', result);
      expect(result.message).toBe('success');
    }));

    it('should return the edited Object', inject([LocalTodoStoreService], (service) => {
      let edited = testTodo;
      let result = service.editTodo(edited.id, testStoreKey, edited);
      console.log(result);
      expect(result.data.task).toBe(edited.task);
    }));

  })



  // Expecting results autoincrement
  describe('Function: autoIncrement', () => {
    const todoToAdd = new Todo(null, "Another Todo", false, new Date());

    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.autoIncrement).not.toBeUndefined();
    }));

    it('should return inital id of 1', inject([LocalTodoStoreService], (service) => {
      localStorage.clear();
      expect(service.autoIncrement(testStoreKey)).toBe(1);
    }));

    it('should return incremented id', inject([LocalTodoStoreService], (service) => {
      expect(service.autoIncrement(testStoreKey)).toBe(testTodo.id+1);
    }));

  })


  // Expecting results for adding todos
  describe('Function: addTodo', () => {
    const todoToAdd = new Todo(null, "Another Todo", false, new Date());

    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.addTodo).not.toBeUndefined();
    }));

    it('should add a todoitem', inject([LocalTodoStoreService], (service) => {
      service.addTodo(todoToAdd, testStoreKey);
      console.log(service.currentTodos(testStoreKey));
      expect(service.getTodos(testStoreKey).data.length).not.toBe(1);
    }));

    it('return a proper result object {message: \'success\', data: obj}', inject([LocalTodoStoreService], (service) => {
      var result = service.addTodo(todoToAdd, testStoreKey)
      console.log(result);
      expect(result.message).toBe('success');
      expect(result.data.task).toEqual(todoToAdd.task);
    }));
  })


  // Expecting results for getting Todos
  describe('Function: getTodos', () => {
    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.getTodos).not.toBeUndefined();
    }));


    it('should return an object with a data property', inject([LocalTodoStoreService], (service) => {
      expect(service.getTodos(testStoreKey).hasOwnProperty('data')).toBeTruthy();

    }));


    it('should have a data property with type of Array', inject([LocalTodoStoreService], (service) => {
      let result = service.getTodos(testStoreKey).data;
      expect(Array.isArray(result)).toBeTruthy();
    }));


    it('should return content', inject([LocalTodoStoreService], (service) => {
      let result = service.getTodos(testStoreKey).data;
      expect(result.length).not.toBe(0);
    }));
  })


  // Expecting results for getting One Todo
  describe('Function: getTodo(id)', () => {
    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.getTodos).not.toBeUndefined();
    }));

    it('should return content', inject([LocalTodoStoreService], (service) => {
      console.log(service.getTodo(testTodo.id, testStoreKey));
      expect(service.getTodo(testTodo.id, testStoreKey).data.task).toEqual(testTodo.task);
    }));

  })



  // Expecting results for deleting todos
  describe('Function: deleteTodo(id)', () => {
    it('should be defined', inject([LocalTodoStoreService], (service) => {
      expect(service.deleteTodo).not.toBeUndefined();
    }));

    it('should remove todo from collection content', inject([LocalTodoStoreService], (service) => {
      service.deleteTodo(testTodo.id, testStoreKey);
      expect(service.getTodos(testStoreKey).data.length).toBe(0);
    }));

  })
});
