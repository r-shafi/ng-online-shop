import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private pds: ProductsService, private cart: CartService) {}

  products: any; // todo: set a type for products
  currentCarts: any;

  ngOnInit(): void {
    this.pds.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
    this.currentCarts = this.cart.cart;
  }

  updateCart(product: any) {
    product.inCart = !product.inCart;
    this.cart.addToCart(product.title);
  }

  isItemInLocalStorage(product: any) {}
}
