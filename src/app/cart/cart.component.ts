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
    console.log("service<<<<<<<>>>>>>>>>>>>>>", this.cartService);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
  goTohome(){
    this.router.navigate(["home"])
  }
  // toggleEdit(qty : any =  null,idx: number =  -1,from : string = ''){
  //   this.selectedIndex= idx
  //   if(qty){
  //     this.newQuantity =  qty
  //   }
  //   this.isEdit =  !this.isEdit
  //   if(this.newQuantity === this.productlist[idx].quantity ) return
   
  //   if(from === "input"){
  //     if(this.newQuantity == 0 || this.newQuantity < 0) {
  //       this.removeitem(this.productlist[idx])
  //        return
  //     }else{
  //       this.productlist[idx].quantity =  this.newQuantity
  //       this.productlist[idx].total =   this.productlist[idx].price * this.newQuantity
  //     }
  //   }
  // }
  decrement(idx: number){
  this.cartService.decrementqty(idx)
    }
    increment(idx : number){
      this.cartService.incrementqty(idx)
    }
  }

  