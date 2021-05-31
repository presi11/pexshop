import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../Shared/authentication/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });


  constructor(
    private authSvc: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  onLogin(): void {
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue).subscribe((res) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }

}
