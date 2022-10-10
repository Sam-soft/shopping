import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, count, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public cartItemList: any = [];
  // private productList = new BehaviorSubject<any>([]);
  public dcrmntqty: number = 1;
  public incrmntqty: number = 1;
  public totalItem: number = 0;

  constructor() {}
  getProducts(): Observable<any[]> {
    // localStorage.setItem("cartitems", JSON.stringify(savecartItemList));

    const strc = localStorage.getItem("savecartitem") || "[]";
    return of(JSON.parse(strc) as any[]);

    // return this.productList.asObservable();
  }
  // getlength(){
  //   const totalItem = JSON.stringify(this.cartItemList);
  //   localStorage.setItem("savecartitem", totalItem);
  //   const totalItem = localStorage.getItem("savecartitem")?.length
  //   return of(JSON.parse(totalItem) as any[])
  // }
  getlength() {
    return (this.totalItem = this.cartItemList.length);
  }
  addToCart(product: any) {
    let data = this.cartItemList.find((item: any) => item.id == product.id);
    if (data) {
      let idx = this.cartItemList.indexOf(data);
      this.cartItemList[idx].quantity += 1;
      // this.cartItemList[idx].price += product.price
      this.cartItemList[idx].total += product.total;
    } else {
      this.cartItemList.push({ ...product });
    }
    // this.productList.next(this.cartItemList);
    const jsonobj = JSON.stringify(this.cartItemList);
    localStorage.setItem("savecartitem", jsonobj);

    this.getTotalPrice();

    console.log(
      "Productcart>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      this.cartItemList
    );
  }
  getTotalPrice() {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
      localStorage.setItem("total", grandTotal.toString());
    });
    return localStorage.getItem("total");
    // return grandTotal;
  }
  decrementqty(idx: number) {
    this.cartItemList[idx].quantity -= 1;

    this.dcrmntqty = this.cartItemList[idx].quantity;
    if (this.dcrmntqty <= 0) {
      this.removeCartItem(this.cartItemList[idx]);
      // localStorage.setItem('decrement',dcr)
    } else {
      this.cartItemList[idx].quantity = this.dcrmntqty;
      this.cartItemList[idx].total =
        this.cartItemList[idx].price * this.dcrmntqty;
      // localStorage.setItem('decrement',dcr)
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

    // this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    // this.productList.next(this.cartItemList);
    localStorage.clear();
    console.log("Remove All Cart <<<<<>>>>>>>>>>>>>>", this.cartItemList);
  }
}

