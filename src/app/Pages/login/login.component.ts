import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../Shared/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:  any = {};
 
  constructor(private authSvc:AuthenticationService) { }

  ngOnInit(): void {
      const userData = {

        email:'Presi1@gmail.com',
        password:'Presi11'
      };
      this.authSvc.login(userData).subscribe((res) => console.log("login") )
  }

}
