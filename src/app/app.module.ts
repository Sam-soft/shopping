import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ShopComponent } from "./shop/shop.component";
import { SignupComponent } from "./signup/signup.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import { SectionComponent } from "./section/section.component";
import { CartComponent } from "./cart/cart.component";
import { AboutComponent } from './about/about.component';
import { FormsModule } from "@angular/forms";
import { SearchFilterPipe } from './search-filter.pipe';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch:'full' },
  {
    path: "home",
    component: ShopComponent,
  },
  {
    path: "getyourbest",
    component: ShopComponent,
  },
  { path: "cart", component: CartComponent },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path:"about", component:AboutComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    SignupComponent,
    NavigationComponent,
    HeaderComponent,
    NavigationComponent,
    HeaderComponent,
    SectionComponent,
    CartComponent,
    AboutComponent,
    SearchFilterPipe,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
