import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { CartService } from "../cart.service";

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.css"],
})
export class SectionComponent implements OnInit {
  public products: any;
  constructor(private api: ApiService, private cartsrvc: CartService) {}

  ngOnInit(): void {
    this.api.getproduct().subscribe((res) => {
      this.products = res;
      this.products.forEach((a: any) =>
        Object.assign(a, { quantity: 1, total: a.price })
      );
    });
  }
  addtocart(item: any) {
    this.cartsrvc.addToCart(item);
  }
  darkMode() {
    let element = document.body;
    element.classList.remove("light-mode");
    element.classList.add("dark-mode");
  }
  lightMode() {
    let element = document.body;

    element.classList.remove("dark-mode");
    element.classList.add("light-mode");
  }
}
