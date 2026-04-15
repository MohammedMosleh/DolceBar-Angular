import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, CommonModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login implements OnInit {
    loginForm!: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private usersService: UsersService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/profile/user-details']);
        }

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    onLogin(): void {
        this.errorMessage = '';

        if (this.loginForm.invalid) {
            if (this.loginForm.get('email')?.hasError('required')) {
                this.errorMessage = 'Email is required';
            } else if (this.loginForm.get('email')?.hasError('email')) {
                this.errorMessage = 'Please enter a valid email address';
            } else if (this.loginForm.get('password')?.hasError('required')) {
                this.errorMessage = 'Password is required';
            } else if (this.loginForm.get('password')?.hasError('minlength')) {
                this.errorMessage = 'Password must be at least 3 characters';
            }
            return;
        }

        const { email, password } = this.loginForm.value;

        this.usersService.login(email, password).subscribe({
            next: (user) => {
                if (!user) {
                    this.errorMessage = 'Invalid email or password';
                    return;
                }
                if (user.isBlocked) {
                    this.errorMessage = 'Your account has been blocked. Please contact the administrator.';
                    alert('Your account has been blocked. Please contact the administrator.');
                    return;
                }
                this.authService.setCurrentUser(user);
                this.router.navigate(['/profile/user-details']);
            },
            error: (error) => {
                this.errorMessage = 'Invalid email or password';
                console.error(error);
            }
        });
    }

    get f() {
        return this.loginForm.controls;
    }
}
