import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authservice';
import { IUser } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailExistsValidator } from '../../validators/email-exists.validator';
import { Router } from '@angular/router';
import { EmailNotFoundValidator } from '../../validators/email-not-found.validator';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm!:FormGroup;
constructor(private authService: AuthService,
   private fb:FormBuilder,
   private emailNotFoundValidator: EmailNotFoundValidator,
   private router: Router
   ){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', 
      [Validators.required, Validators.email]
        , [this.emailNotFoundValidator.validate()]
    ],
      password:['',
       [Validators.required, Validators.minLength(8)]      ]
    });
  }


    hasError(controlName: string, errorName: string): boolean {
      const control = this.loginForm.get(controlName);
      return !!(control?.hasError(errorName) && control?.touched);
    }

onSubmit() {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    
    this.authService.login(formData).subscribe((response) => {
      if (response.length === 0) {
        //wrong email or password
        this.loginForm.get('password')?.setErrors({ wrongPassword: true });
        return;
      }
      const currentUser = response[0];
    
      if (currentUser.role === "admin") {
        this.router.navigateByUrl("/dashboard");
      } else {
        this.router.navigateByUrl("/products");
      }
    });
  }
}
}
