import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    units: 0
  };

  message = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        this.message = 'Product added successfully.';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 500);
      },
      error: (error) => {
        this.message = error.error?.message || 'Error adding product.';
      }
    });
  }
}