import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-edit-user',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './edit-user.html',
    styleUrl: './edit-user.css'
})
export class EditUser implements OnInit {
    userForm!: FormGroup;
    userEmail: string = '';
    successMessage: string = '';
    errorMessage: string = '';
    loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private usersService: UsersService
    ) { }

    ngOnInit(): void {
        this.userEmail = this.route.snapshot.paramMap.get('email') || '';
        this.initForm();
        this.loadUser();
    }

    initForm(): void {
        this.userForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(2)]],
            birthday: ['', Validators.required],
            gender: ['male', Validators.required],
            isAdmin: [false],
            isBlocked: [false]
        });
    }

    loadUser(): void {
        this.loading = true;
        this.usersService.getUserByEmail(this.userEmail).subscribe({
            next: (user) => {
                if (user) {
                    this.userForm.patchValue({
                        fullName: user.fullName,
                        birthday: user.birthday,
                        gender: user.gender,
                        isAdmin: user.isAdmin,
                        isBlocked: user.isBlocked
                    });
                } else {
                    this.errorMessage = 'User not found';
                }
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load user data';
                this.loading = false;
                console.error(err);
            }
        });
    }

    onSubmit(): void {
        this.successMessage = '';
        this.errorMessage = '';

        if (this.userForm.invalid) {
            this.errorMessage = 'Please fill all required fields correctly';
            return;
        }

        const updates = this.userForm.value;
        this.usersService.updateUser(this.userEmail, updates).subscribe({
            next: (updatedUser) => {
                this.successMessage = 'User updated successfully!';
                setTimeout(() => {
                    this.router.navigate(['/manage-users']);
                }, 1500);
            },
            error: (err) => {
                this.errorMessage = 'Failed to update user';
                console.error(err);
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/manage-users']);
    }
}
