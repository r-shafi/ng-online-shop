import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { DialogComponent } from '../../utils/dialog/dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private cart: CartService,
    private prodSer: ProductsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  itemsInCart: any;
  filteredProducts: any = [];
  quantity: any = [];

  ngOnInit(): void {
    this.itemsInCart = this.cart.cart;
    this.prodSer.getProducts().subscribe((data: any) => {
      this.filteredProducts = data.filter((product: any) =>
        this.itemsInCart.includes(product.title)
      );
      this.quantity = this.filteredProducts.map((child: any) => ({
        [child.title]: 1,
      }));
    });
  }

  updateOrder(product: any, method: string) {
    this.quantity.map((item: any) => {
      if (Object.keys(item)[0] === product) {
        if (method === 'add') {
          item[Object.keys(item)[0]]++;
        }
        if (method === 'subtract') {
          if (item[Object.keys(item)[0]] > 1) {
            item[Object.keys(item)[0]]--;
          }
        }
      }
    });
  }

  specificItem(product: any) {
    return this.quantity.filter((item: any) => {
      if (Object.keys(item)[0] === product) {
        return item[Object.keys(item)[0]];
      }
    })[0];
  }

  updatePrice(product: any) {
    this.quantity.map((item: any) => {
      if (Object.keys(item)[0] === product.title) {
        product.price = item[Object.keys(item)[0]] * product.fixed;
      }
    });

    return product.price;
  }

  removeItem(product: any) {
    this.filteredProducts = this.filteredProducts.filter(
      (child: any) => child.title !== product.title
    );
  }

  order() {
    const prices = this.filteredProducts.map((child: any) => child.price);
    const total = prices.reduce((acc: any, cur: any) => acc + cur);

    const ref = this.dialog.open(DialogComponent, {
      data: {
        items: this.itemsInCart,
        total,
      },
    });

    ref.afterClosed().subscribe(() => {
      this.itemsInCart = undefined;
      this.filteredProducts = undefined;
      this.quantity = undefined;

      this.cart.cart = [];

      this.router.navigateByUrl('/products');
    });
  }
}
