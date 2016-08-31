import { Injectable } from '@angular/core';
import { Todo } from './todo/todo';

@Injectable()
export class LocalTodoStoreService {

  constructor() {}

  storageKey = 'todoStore';

  currentTodos(key: string) {
    let stringData = localStorage.getItem(key);
    if (stringData) {
      return JSON.parse(stringData);
    } else {
      return [];
    }
  }

  getLatest(key: string) {
    const latest = this.currentTodos(key).pop();
    if (latest) {
      return new Todo(latest.id, latest.task, latest.checked, latest.created);
    } else {
      return null;
    }
  }

  autoIncrement(key: string) {
    const latest = this.getLatest(key);
    if (latest) {
      return latest.id + 1;
    } else {
      return 1;
    }
  }

  storageEnabled() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch(e) {
      console.log(e);
      return false;
    };
  }

  getTodos(key: string = this.storageKey) {
    return { data: this.currentTodos(key)};
  }

  getTodo(id: number, key: string = this.storageKey) {
    let result = this.currentTodos(key).filter((el) => {
      return el.id === id;
    })

    return {message: 'success', data: result[0]};
  }

  addTodo(todo: Todo, key: string = this.storageKey) {
    let currentTodos = this.currentTodos(key);
    todo.id = this.autoIncrement(key);
    currentTodos.push(todo);
    localStorage.setItem(key, JSON.stringify(currentTodos));
    return {message: 'success', data: this.getLatest(key)};
  }

  editTodo(id: number, key: string = this.storageKey, todo: Todo) {
    let found = false;
    let currentTodos = this.currentTodos(key);
    let result = currentTodos.map((el, index) => {
      if (el.id === id) {
        found = true;
        el = todo;
      }
      return el;
    })

    if (found) {
      return {message: 'success', data: this.getTodo(id, key).data};
    } else {
      return null;
    }
  }

  deleteTodo(id:number, key: string) {
    let currentTodos = this.currentTodos(key);
    let target = currentTodos.find((el) => el.id === id);
    let targetIndex = currentTodos.indexOf(target);
    currentTodos.splice(targetIndex, 1);
    localStorage.setItem(key, JSON.stringify(currentTodos));
  }
}
