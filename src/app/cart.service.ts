import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public cartItemList: any = [];
  public dcrmntqty: number = 1;
  public incrmntqty: number = 1;
  public totalItem: number = 0;

  constructor() {}
  getProducts(): Observable<any[]> {
    const strc = localStorage.getItem("savecartitem") || "[]";
    return of(JSON.parse(strc) as any[]);
  }
  getlength() {
    return (this.totalItem = this.cartItemList.length);
  }
  addToCart(product: any) {
    let data = this.cartItemList.find((item: any) => item.id == product.id);
    if (data) {
      let idx = this.cartItemList.indexOf(data);
      this.cartItemList[idx].quantity += 1;
      this.cartItemList[idx].total += product.total;
    } else {
      this.cartItemList.push({ ...product });
    }
    const jsonobj = JSON.stringify(this.cartItemList);
    localStorage.setItem("savecartitem", jsonobj);

    this.getTotalPrice();
  }
  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
      localStorage.setItem("total", grandTotal.toString());
    });
    return localStorage.getItem("total");
  }
  decrementqty(idx: number) {
    this.cartItemList[idx].quantity -= 1;

    this.dcrmntqty = this.cartItemList[idx].quantity;
    if (this.dcrmntqty <= 0) {
      this.removeCartItem(this.cartItemList[idx]);
    } else {
      this.cartItemList[idx].quantity = this.dcrmntqty;
      this.cartItemList[idx].total =
        this.cartItemList[idx].price * this.dcrmntqty;
      const dcr = JSON.stringify(this.cartItemList);
      localStorage.setItem("savecartitem", dcr);
    }
  }

  incrementqty(idx: number) {
    this.cartItemList[idx].quantity += 1;
    this.incrmntqty = this.cartItemList[idx].quantity;

    this.cartItemList[idx].quantity = this.incrmntqty;
    this.cartItemList[idx].total =
      this.cartItemList[idx].price * this.incrmntqty;
    const inc = JSON.stringify(this.cartItemList);
    localStorage.setItem("savecartitem", inc);
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
        const rmv = JSON.stringify(this.cartItemList);
        localStorage.setItem("savecartitem", rmv);
      }
    });

    const rmv = localStorage.getItem("savecartitem") || "[]";
    return of(JSON.parse(rmv) as any[]);
  }

  removeAllCart() {
    this.cartItemList = [];
    localStorage.clear();
  }
}
