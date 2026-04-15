import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-view-users',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './view-users.html',
    styleUrl: './view-users.css'
})
export class ViewUsers implements OnInit {
    users: User[] = [];
    loading: boolean = true;
    errorMessage: string = '';

    constructor(private usersService: UsersService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.loading = true;
        this.usersService.getAllUsers().subscribe({
            next: (users) => {
                this.users = users;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load users. Make sure the server is running.';
                this.loading = false;
                console.error(err);
            }
        });
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
