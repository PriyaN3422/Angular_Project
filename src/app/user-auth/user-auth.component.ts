import { Component } from '@angular/core';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  constructor(private user:UserService) {}
  signup(data:signUp){
    this.user.signUp(data);
  }
}
