import { Todo } from './todo';

describe('Model: Todo', () => {
  it('should have an id', () => {
    let todo = new Todo(1, 'learning angular', null, null);
    expect(todo.id).not.toBeUndefined();
    expect(todo.id).toEqual(1);
  })

  it('should have a task', () => {
    let todo = new Todo(1, 'learning angular', null, null);
    expect(todo.task).not.toBeUndefined();
    expect(todo.task).toEqual('learning angular');
  })

  it('should have a checked property', () => {
    let todo = new Todo(1, 'learning angular', true, null);
    expect(todo.checked).not.toBeUndefined();
    expect(todo.checked).toBeTruthy();
  })

  it('should have a created property', () => {
    let date = new Date()
    let todo = new Todo(1, 'learning angular', true, date);
    expect(todo.created).not.toBeUndefined();
    expect(todo.created).toBe(date);
  })
})
