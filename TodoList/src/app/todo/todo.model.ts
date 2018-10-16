export class Todo {
  userId:number;
  id: string;
  desc: string;
  completed: boolean;
}

export class User{
  id:number;
  username:string;
  password:string;
}

export class Auth{
  user:User;
  hasError:boolean;
  errMsg:string;
  redirectUrl:string;
}