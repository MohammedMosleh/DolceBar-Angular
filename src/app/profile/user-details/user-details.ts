import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-details',
    imports: [CommonModule],
    templateUrl: './user-details.html',
    styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
    currentUser: User | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();

        if (!this.currentUser) {
            this.router.navigate(['/profile/login']);
        }
    }
    onLogout() {
        this.authService.logout();
        this.currentUser = null
        this.router.navigate(['/profile/login']);
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
