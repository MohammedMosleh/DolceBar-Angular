import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { productsData } from '../models/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: Product | undefined;


  constructor(
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productName = this.actRoute.snapshot.params['name'];
    this.product = productsData.find(p => p.name === productName);

    if (!this.product) {
      console.error(`Product with name ${productName} not found.`);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
