import { Component } from '@angular/core';
import { Categories } from '../categories/categories';
import { Products } from '../products/products';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [Categories, Products],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css',
})
export class Catalog {
    selectedCategoryId: number | null = null;

    onCategorySelected(categoryId: number | null): void {
        this.selectedCategoryId = categoryId;
    }
}
