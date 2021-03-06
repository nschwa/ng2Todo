import { Component, ViewEncapsulation } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LocalTodoStoreService } from './local-todo-store.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [TodoListComponent],
  providers: [LocalTodoStoreService],
  encapsulation: ViewEncapsulation.Native
})

export class AppComponent {
  title = 'organiZr';
}
