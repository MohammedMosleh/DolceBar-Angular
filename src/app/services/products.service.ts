import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
    id?: number;
    name: string;
    image: string;
    price: number;
    description: string;
    fullDescription: string;
    categoryId: number;
}

export interface Category {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private productsURL = 'http://localhost:3000/products';
    private categoriesURL = 'http://localhost:3000/categories';

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsURL);
    }

    getProductById(id: number): Observable<Product | null> {
        return this.http.get<Product>(`${this.productsURL}/${id}`);
    }

    getProductsByCategory(categoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.productsURL}?categoryId=${categoryId}`);
    }

    addProduct(product: Omit<Product, 'id'>): Observable<Product> {
        return this.http.post<Product>(this.productsURL, product);
    }

    updateProduct(id: number, updates: Partial<Product>): Observable<Product> {
        return this.http.patch<Product>(`${this.productsURL}/${id}`, updates);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.productsURL}/${id}`);
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesURL);
    }
}
