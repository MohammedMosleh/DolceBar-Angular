import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { productsData } from '../models/data';
import { CartService } from '../services/cart.service';

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './products.html',
    styleUrl: './products.css',
})
export class Products implements OnChanges {
    @Input() selectedCategoryId: number | null = null;

    allProducts: Product[] = productsData;
    filteredProducts: Product[] = productsData;

    constructor(private cartService: CartService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedCategoryId']) {
            this.filterProducts();
        }
    }

    filterProducts(): void {
        if (this.selectedCategoryId === null) {
            this.filteredProducts = this.allProducts;
        } else {
            this.filteredProducts = this.allProducts.filter(
                product => product.categoryId === this.selectedCategoryId
            );
        }
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product);
        alert(product.name + ' added to cart!');
    }
}
