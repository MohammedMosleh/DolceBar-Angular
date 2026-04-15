import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService, Product, Category } from '../../services/products.service';

@Component({
    selector: 'app-view-products',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './view-products.html',
    styleUrl: './view-products.css'
})
export class ViewProducts implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    loading: boolean = true;
    errorMessage: string = '';

    constructor(private productsService: ProductsService) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loading = true;

        this.productsService.getAllCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
                this.loadProducts();
            },
            error: (err) => {
                this.errorMessage = 'Failed to load categories';
                this.loading = false;
                console.error(err);
            }
        });
    }

    loadProducts(): void {
        this.productsService.getAllProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load products. Make sure the server is running.';
                this.loading = false;
                console.error(err);
            }
        });
    }

    getCategoryName(categoryId: number): string {
        const category = this.categories.find(c => c.id === categoryId);
        return category ? category.name : 'Unknown';
    }

    deleteProduct(id: number): void {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productsService.deleteProduct(id).subscribe({
                next: () => {
                    this.products = this.products.filter(p => p.id !== id);
                },
                error: (err) => {
                    this.errorMessage = 'Failed to delete product';
                    console.error(err);
                }
            });
        }
    }
}
