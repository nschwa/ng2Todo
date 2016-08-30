import { Input, Component, OnInit } from '@angular/core';
import { Todo } from './todo';

@Component({
  moduleId: module.id,
  selector: 'app-todo',
  templateUrl: 'todo.component.html',
  styleUrls: ['todo.component.css']
})

export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor() { }

  ngOnInit() {
  }

  onClose(todo: Todo) {
    todo.checked = !todo.checked;
  }
}
