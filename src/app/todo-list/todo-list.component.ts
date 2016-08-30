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
  todos: Todo[] = [
    {id: 1337, task: "Learn Javascript", checked: true, created: new Date()},
    {id: 1338, task: "Learn Angular", checked: false, created: new Date()},
    {id: 1339, task: "Learn MongoDB", checked: true, created: new Date()}
  ]
  constructor() { }

  ngOnInit() {
  }

}
