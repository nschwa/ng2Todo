import { Component, OnInit } from '@angular/core';
import { Todo } from './../todo/todo';
import { TodoComponent } from './../todo/todo.component';

@Component({
  moduleId: module.id,
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.css'],
  directives: [TodoComponent]
})

export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor() { }

  ngOnInit() {
    
  }

}
