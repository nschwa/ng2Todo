import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from './todo';
import { LocalTodoStoreService } from './../local-todo-store.service';

@Component({
  moduleId: module.id,
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.css']
})

export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onDeleted = new EventEmitter<string>();

  isEdit = false;

  constructor(private _ltss: LocalTodoStoreService) { }

  ngOnInit() {
  }

  onChecked() {
    this.todo.checked = !this.todo.checked;
    this._ltss.editTodo(this.todo.id, 'todoStore', this.todo);
  }

  onDelete() {
    this._ltss.deleteTodo(this.todo.id, 'todoStore');
    this.onDeleted.emit('Todo Deleted');
    this.todo = null;
  }

  onEdit(todo?: Todo) {
    this.isEdit = true;
  }

  onBlur() {
    this.isEdit = false;
    this._ltss.editTodo(this.todo.id, 'todoStore', this.todo);
  }
}
