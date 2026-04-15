import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService, Category } from '../../services/products.service';

@Component({
    selector: 'app-edit-product',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './edit-product.html',
    styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {
    productForm!: FormGroup;
    productId: number = 0;
    categories: Category[] = [];
    successMessage: string = '';
    errorMessage: string = '';
    loading: boolean = true;
    isEditMode: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private productsService: ProductsService
    ) { }

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!idParam;
        this.productId = idParam ? +idParam : 0;

        this.initForm();
        this.loadCategories();

        if (this.isEditMode) {
            this.loadProduct();
        } else {
            this.loading = false;
        }
    }

    initForm(): void {
        this.productForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            price: [0, [Validators.required, Validators.min(1)]],
            description: ['', Validators.required],
            fullDescription: [''],
            image: ['/assets/waffle.jpeg', Validators.required],
            categoryId: [1, Validators.required]
        });
    }

    loadCategories(): void {
        this.productsService.getAllCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: (err) => {
                console.error('Failed to load categories', err);
            }
        });
    }

    loadProduct(): void {
        this.loading = true;
        this.productsService.getProductById(this.productId).subscribe({
            next: (product) => {
                if (product) {
                    this.productForm.patchValue({
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        fullDescription: product.fullDescription,
                        image: product.image,
                        categoryId: product.categoryId
                    });
                } else {
                    this.errorMessage = 'Product not found';
                }
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load product data';
                this.loading = false;
                console.error(err);
            }
        });
    }

    onSubmit(): void {
        this.successMessage = '';
        this.errorMessage = '';

        if (this.productForm.invalid) {
            this.errorMessage = 'Please fill all required fields correctly';
            return;
        }

        const productData = this.productForm.value;

        if (this.isEditMode) {
            this.productsService.updateProduct(this.productId, productData).subscribe({
                next: () => {
                    this.successMessage = 'Product updated successfully!';
                    setTimeout(() => {
                        this.router.navigate(['/manage-products']);
                    }, 1500);
                },
                error: (err) => {
                    this.errorMessage = 'Failed to update product';
                    console.error(err);
                }
            });
        } else {
            this.productsService.addProduct(productData).subscribe({
                next: () => {
                    this.successMessage = 'Product added successfully!';
                    setTimeout(() => {
                        this.router.navigate(['/manage-products']);
                    }, 1500);
                },
                error: (err) => {
                    this.errorMessage = 'Failed to add product';
                    console.error(err);
                }
            });
        }
    }

    goBack(): void {
        this.router.navigate(['/manage-products']);
    }
}
