import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {

  product = signal<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    units: 0
  });

  productId = '';
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';

    console.log('Product ID: ', this.productId);

    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {

        console.log('Products:', products);

        const foundProduct = products.find(
          product => product._id === this.productId
        );

        if (foundProduct) {
          this.product.set(foundProduct);
        } else {
          this.message = 'Product not found.';
          console.log('Product not found:', this.productId);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.message = 'Error loading product.';
      }
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(
      this.productId,
      this.product()
    ).subscribe({
      next: () => {
        this.message = 'Product updated successfully.';

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 500);
      },
      error: (error) => {
        this.message =
          error.error?.message || 'Error updating product.';
      }
    });
  }
}