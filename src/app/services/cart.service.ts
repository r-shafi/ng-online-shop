import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  cartLen: Subject<Number> = new Subject<Number>();

  cart: any = [];

  addToCart(product: any) {
    if (this.cart.includes(product)) {
      const i = this.cart.indexOf(product); // index of product to remove
      this.cart.splice(i, 1);
    } else {
      this.cart.push(product);
    }

    this.cartLen.next(this.cart.length);
  }
}

// TODO: add CART to sessionStorage and access it in cartRoute
