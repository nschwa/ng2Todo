import { Component, OnInit } from '@angular/core';
import { Todo } from './../todo/todo';
import { TodoComponent } from './../todo/todo.component';
import { LocalTodoStoreService } from './../local-todo-store.service';
import { TodoInputComponent } from './../todo-input/todo-input.component';

@Component({
  moduleId: module.id,
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.css'],
  directives: [TodoComponent, TodoInputComponent]
})

export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private _ltss: LocalTodoStoreService) {}

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this.todos = this._ltss.getTodos().data;
  }

  onSaved(event) {
    this.updateData();
  }

  onDeleted(event) {
    this.updateData();
  }

}
