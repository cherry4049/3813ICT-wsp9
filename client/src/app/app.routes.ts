import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products';
import { AddProduct } from './add-product/add-product';
import { UpdateProduct } from './update-product/update-product';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },

    {
        path: 'products',
        component: ProductsComponent
    },

    {
        path: 'add-product',
        component: AddProduct
    },

    {
        path: 'update-product/:id',
        component: UpdateProduct
    }
];

