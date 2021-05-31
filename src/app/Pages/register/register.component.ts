import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthenticationService,
    private router:Router,
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    const formValue = this.registerForm.value;
    this.authSvc.register(formValue).subscribe((res) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }
}
