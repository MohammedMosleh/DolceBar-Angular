import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
        this.loadUserFromSession();
    }

    private loadUserFromSession(): void {
        if (this.isBrowser) {
            const userJson = sessionStorage.getItem('currentUser');
            if (userJson) {
                const user = JSON.parse(userJson);
                this.currentUserSubject.next(user);
            }
        }
    }

    setCurrentUser(user: User | null): void {
        if (this.isBrowser) {
            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.removeItem('currentUser');
            }
        }
        this.currentUserSubject.next(user);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isLoggedIn(): boolean {
        return this.currentUserSubject.value !== null;
    }

    logout(): void {
        this.setCurrentUser(null);
    }

    isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user !== null && user.isAdmin === true;
    }
}
