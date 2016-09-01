import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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

export class TodoListComponent implements OnChanges, OnInit {
  todos: Todo[] = [];

  constructor(private _ltss: LocalTodoStoreService) {}

  totalCount() {
    return this.todos.length;
  }

  completedCount() {
    return this.todos.filter(el => el.checked).length;
  }

  remainingCount() {
    return this.totalCount() - this.completedCount();
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['todos']);
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
