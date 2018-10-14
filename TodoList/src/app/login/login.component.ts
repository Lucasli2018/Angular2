import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onSubmit(formValue) {
    let result=this.service.loginWithCredentials(formValue.login.username, formValue.login.password);
    console.log('auth result is: '+ result);
    if(result){
      window.location.href='todo';
    }else{
      alert('用户名或密码不正确');
    }
  }

}
