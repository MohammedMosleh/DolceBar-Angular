import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Cart, CartProduct } from '../models/cart';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: Cart = new Cart();
    private productsSubject = new BehaviorSubject<CartProduct[]>([]);
    public products$ = this.productsSubject.asObservable();

    private ordersURL = 'http://localhost:3000/orders';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.updateUser(user.fullName);
            } else {
                this.updateUser('');
            }
        });
    }

    addToCart(product: Product): void {
        this.cart.addProduct(product);
        this.productsSubject.next(this.cart.products);
    }

    removeFromCart(product: Product): void {
        this.cart.removeProduct(product);
        this.productsSubject.next(this.cart.products);
    }

    addQuantity(product: Product): void {
        this.cart.addQuantity(product);
        this.productsSubject.next(this.cart.products);
    }

    reduceQuantity(product: Product): void {
        this.cart.reduceQuantity(product);
        this.productsSubject.next(this.cart.products);
    }

    updateUser(userName: string): void {
        this.cart.user = userName;
    }

    clearCart(): void {
        this.cart.clearCart();
        this.productsSubject.next(this.cart.products);
    }

    getCartTotal(): number {
        return this.cart.cartTotal;
    }

    checkout(): Observable<any> {
        const order = {
            user: this.cart.user,
            products: this.cart.products.map(item => ({
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            })),
            total: this.cart.cartTotal,
            date: new Date().toLocaleDateString(),
            isPaid: true
        };

        return new Observable(observer => {
            this.http.post(this.ordersURL, order).subscribe({
                next: (result) => {
                    this.clearCart();
                    observer.next(result);
                    observer.complete();
                },
                error: (err) => observer.error(err)
            });
        });
    }
}
