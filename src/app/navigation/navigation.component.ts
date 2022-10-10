import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart.service";
@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {


  constructor(private router: Router, public cartsrvc: CartService) {}

  ngOnInit(): void {

   
      }
  goToLogin() {
    this.router.navigate(["signup"]);
  }
  goTocart() {
    this.router.navigate(["cart"]);
  }
  goToallproducts(){
    this.router.navigate(['home'])
  }
  goToabout(){
    this.router.navigate(['about'])
  }
  goTogetyourbest(){
    this.router.navigate(['getyourbest'])
  }
}
