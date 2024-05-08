import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UtilsService } from '../services/utils.service'
import { TodosApiService } from '../services/todos-api.service';
@Component({
  selector: 'td-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    userForm!: FormGroup;
    loginForm!: FormGroup;
    submitted = false;
    isLogin:boolean=true;
    passwordMatch:boolean=true;
    constructor(
            private formBuilder: FormBuilder, 
            private router: Router, 
            private utils:UtilsService,
            private todoApiService:TodosApiService
            ) { }
    
    ngOnInit(): void {
      this.userForm = this.formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        cpassword: ['', [Validators.required, Validators.minLength(8)]]
      });
    // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#\?\!@\$%\^&\*_]).{8,}$') for password
    }

    get f() { 
      return this.userForm.controls; 
    }

    checkPassword(){
      if(this.f['password'].value===this.f['cpassword'].value){
        this.passwordMatch = true;
      }
      else{
        this.passwordMatch = false;
      }
    }

    onSubmit() {
      const logiForm = {
        "username":this.userForm.value.email,
        "password":this.userForm.value.password
      }
      this.submitted = true;
      if(!logiForm.username){
        return;
      }
      this.todoApiService.getAuthenticated(logiForm).subscribe({
        next: token_details => {
          this.utils.setToken(token_details);
          this.router.navigate(['/user/category']);
          this.utils.setSideNav(true);
        },
        error: err => {
          alert(err);
          this.router.navigate(['./login']);
        }
      });
    }

    SignUp() {
      this.submitted = true;
      if (this.userForm.invalid) {
          return;
      }
      if(!this.passwordMatch){
        alert("password does not match with confirm password!!!")
        return
      }
      let dataa = this.userForm.value;
      delete dataa.cpassword
      
      this.todoApiService.registerUser(dataa).subscribe({
        next: (res:any) => {
          alert(res.email +" created successfully");
          this.isLogin = !this.isLogin;
        },
        error: err => {
          alert(err);
          this.router.navigate(['./login']);
        }
      })
    }
}
