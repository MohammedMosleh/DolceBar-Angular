import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private URL: string = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    register(userData: { email: string; password: string; fullName: string; birthday: string; gender: 'male' | 'female'; image?: string }): Observable<User> {
        const newUser = {
            ...userData,
            image: userData.image || (userData.gender === 'male' ? '/assets/avatar-male.svg' : '/assets/avatar-female.svg'),
            isAdmin: false,
            isBlocked: false
        };
        return this.http.post<User>(this.URL, newUser);
    }

    login(email: string, password: string): Observable<User | null> {
        return this.http.get<User[]>(`${this.URL}?email=${email}&password=${password}`).pipe(
            map(users => users.length > 0 ? users[0] : null)
        );
    }

    getUserByEmail(email: string): Observable<User | null> {
        return this.http.get<User[]>(`${this.URL}?email=${email}`).pipe(
            map(users => users.length > 0 ? users[0] : null)
        );
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.URL);
    }

    updateUser(email: string, updates: Partial<Omit<User, 'email' | 'password'>>): Observable<User> {
        return new Observable(observer => {
            this.http.get<User[]>(`${this.URL}?email=${email}`).subscribe({
                next: (users) => {
                    if (users.length > 0) {
                        const user = users[0] as any;
                        this.http.patch<User>(`${this.URL}/${user.id}`, updates).subscribe({
                            next: (updatedUser) => {
                                observer.next(updatedUser);
                                observer.complete();
                            },
                            error: (err) => observer.error(err)
                        });
                    } else {
                        observer.error(new Error('User not found'));
                    }
                },
                error: (err) => observer.error(err)
            });
        });
    }
}
