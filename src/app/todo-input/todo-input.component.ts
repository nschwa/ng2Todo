import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from './../todo/todo';
import { LocalTodoStoreService } from './../local-todo-store.service';

@Component({
  moduleId: module.id,
  selector: 'app-todo-input',
  templateUrl: 'todo-input.component.html',
  styleUrls: ['todo-input.component.css']
})

export class TodoInputComponent implements OnInit {
  newTodo: Todo = new Todo(null, '', false, null);
  @Output() onSaved = new EventEmitter<string>();

  constructor(private _ltss: LocalTodoStoreService) {}

  ngOnInit() {
  }

  onKeyPress(event) {
    if (event.key === 'Enter') this.save();
  }

  save() {
    if (this.newTodo.task !== '') {
      this._ltss.addTodo(this.newTodo, 'todoStore');
      this.onSaved.emit('new todo saved');
      this.newTodo.task = '';
    }
  }
}
