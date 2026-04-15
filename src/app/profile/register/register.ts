import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register implements OnInit {
    registerForm!: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirmPassword: ['', [Validators.required]],
            birthday: ['', [Validators.required]],
            gender: ['male', [Validators.required]]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        return null;
    }

    onRegister(): void {
        this.errorMessage = '';
        this.successMessage = '';

        this.registerForm.markAllAsTouched();

        if (this.registerForm.invalid) {
            if (this.f['fullName'].hasError('required')) {
                this.errorMessage = 'Full name is required';
            } else if (this.f['fullName'].hasError('minlength')) {
                this.errorMessage = 'Full name must be at least 2 characters';
            } else if (this.f['email'].hasError('required')) {
                this.errorMessage = 'Email is required';
            } else if (this.f['email'].hasError('email')) {
                this.errorMessage = 'Please enter a valid email address';
            } else if (this.f['password'].hasError('required')) {
                this.errorMessage = 'Password is required';
            } else if (this.f['password'].hasError('minlength')) {
                this.errorMessage = 'Password must be at least 4 characters';
            } else if (this.f['confirmPassword'].hasError('required')) {
                this.errorMessage = 'Please confirm your password';
            } else if (this.f['confirmPassword'].hasError('passwordMismatch')) {
                this.errorMessage = 'Passwords do not match';
            } else if (this.f['birthday'].hasError('required')) {
                this.errorMessage = 'Birthday is required';
            }
            return;
        }

        const formValue = this.registerForm.value;
        const userData = {
            email: formValue.email,
            password: formValue.password,
            fullName: formValue.fullName,
            birthday: formValue.birthday,
            gender: formValue.gender
        };

        this.usersService.register(userData).subscribe({
            next: (newUser) => {
                this.successMessage = 'Registration successful! Redirecting to login...';
                setTimeout(() => {
                    this.router.navigateByUrl('/profile/login');
                }, 1500);
            },
            error: (err) => {
                this.errorMessage = 'A user with this email already exists';
                console.error(err);
            }
        });
    }

    get f() {
        return this.registerForm.controls;
    }
}
