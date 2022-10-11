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
  public filterCategory : any
   searchKey:string ="";
  constructor(private api: ApiService, private cartsrvc: CartService) {}

  ngOnInit(): void {
    this.api.getproduct().subscribe((res) => {
      this.products = res;
        this.filterCategory = res;
      this.products.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.products)
    });

    this.cartsrvc.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
     
  }
  addtocart(item: any) {
    this.cartsrvc.addToCart(item);
  }
  filter(category:string){
    this.filterCategory = this.products
    .filter((a:any)=>{
      if(a.category === category || category===''){
        return a;
      }
    })
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
