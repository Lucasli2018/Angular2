import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routes';
import { AuthService } from './core/auth.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService } from './todo/todo-data';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    routing,
    TodoModule
  ],
  providers: [
    {
      provide:'auth',
      useClass:AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
