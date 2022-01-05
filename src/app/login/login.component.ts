import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  error!: string |null;
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  authorize() {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this.clearError();
    this.employeeService.login(this.loginForm.value)
    .subscribe((authResponse: any) => {
      console.log(authResponse)
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, (error) => {
      this.error = error.error.errorMessage;
      console.log(this.error);
      this.isLoading = false;
    }) ;
  }

  clearFields() {
    this.loginForm.reset();
  }

  clearError() {
    this.error = null;
  }

}
