import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category';
import { categoriesData } from '../models/data';

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './categories.html',
    styleUrl: './categories.css',
})
export class Categories {
    categories: Category[] = categoriesData;
    selectedCategoryId: number | null = null;

    @Output() categorySelected = new EventEmitter<number | null>();

    onCategoryClick(categoryId: number | null): void {
        this.selectedCategoryId = categoryId;
        this.categorySelected.emit(categoryId);
    }
}
