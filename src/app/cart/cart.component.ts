import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  public productlist: any = [];
  public value: any = ([]);
  isEdit: boolean = false
  newQuantity : number  =  0
  selectedIndex: number | undefined;
  constructor(public cartService: CartService,private router:Router) {}

  ngOnInit(): void {
 this.productlist = this.cartService.cartItemList
    this.cartService.getProducts().subscribe(res => {
    this.cartService.cartItemList = res

    });
  }
  removeitem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
  goTohome(){
    this.router.navigate(["home"])
  }
  decrement(idx: number){
  this.cartService.decrementqty(idx)
    }
    increment(idx : number){
      this.cartService.incrementqty(idx)
    }
  }

  