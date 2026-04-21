import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { EmailExistsValidator } from '../../validators/email-exists.validator';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private emailExistsValidator: EmailExistsValidator // inject هنا
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName:  ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.emailExistsValidator.validate()] 
        ],
        password:        ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['',  Validators.required],
      },
      { validators: this.passwordsMismatch } 
    );
  }

  passwordsMismatch(form: FormGroup) {
    const password        = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.hasError(errorName) && control?.touched);
  }

  onSubmit(): void {
    if (this.registerForm.valid) { 
      const currentUser = this.registerForm.value;
      this.authService.register(currentUser).subscribe(() => {
        console.log('User registered:', currentUser);
        this.router.navigate(['/login']);
      });
    }
  }
}