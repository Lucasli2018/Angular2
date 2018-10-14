import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  desc:string='';
  todos:Todo[]=[];

  constructor(@Inject('todoService') private service) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.service
      .getTodos()
      .then(todos => this.todos = [...todos]);
  }

  onTextChanges(value:string){
    this.desc=value;
  }

  addTodo(){
    this.service
      .addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }

  toggleAll(){
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }

  removeTodo(todo: Todo): Promise<void>  {
    const i = this.todos.indexOf(todo);
    return this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
        return null;
      });
  }

  toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
          ];
        return null;
      });
  }

  clearCompleted(){
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.service.deleteTodoById(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }

}
