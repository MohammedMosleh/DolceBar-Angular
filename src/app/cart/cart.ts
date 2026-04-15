import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { CartProduct } from '../models/cart';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.html',
    styleUrl: './cart.css'
})
export class CartComponent {
    cartProducts: CartProduct[] = [];
    cartTotal: number = 0;
    isLoggedIn: boolean = false;

    constructor(
        private cartService: CartService,
        private authService: AuthService
    ) {
        this.cartService.products$.subscribe(products => {
            this.cartProducts = products;
            this.cartTotal = this.cartService.getCartTotal();
        });

        this.authService.currentUser$.subscribe(user => {
            this.isLoggedIn = user !== null;
        });
    }

    addQuantity(item: CartProduct): void {
        this.cartService.addQuantity(item.product);
    }

    reduceQuantity(item: CartProduct): void {
        this.cartService.reduceQuantity(item.product);
    }

    removeProduct(item: CartProduct): void {
        this.cartService.removeFromCart(item.product);
    }

    clearCart(): void {
        this.cartService.clearCart();
    }

    checkout(): void {
        this.cartService.checkout().subscribe({
            next: () => {
                alert('Payment successful! Your order has been placed.');
            },
            error: (err) => {
                console.error(err);
                alert('Error processing payment. Please try again.');
            }
        });
    }
}
