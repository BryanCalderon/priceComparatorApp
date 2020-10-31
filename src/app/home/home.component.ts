import { Component, OnInit } from '@angular/core';
import { HomeService, Producto } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // host: { 'class': 'container' }
})
export class HomeComponent implements OnInit {

  search: String;
  products: Producto[];

  constructor(private homeService: HomeService) {
    this.products = []
  }

  ngOnInit(): void {
    this.getProductsMasBuscados();
  }

  getProductsMasBuscados() {
    this.homeService.get().subscribe(data => {
      this.products = data['results'];
    })
  }

  searchProducts() {
    this.search = this.search.replace(RegExp(/ /g), "+");
    console.log("searchProducts > ", this.search);

    this.homeService.searchProducts(this.search).subscribe(data => {
      console.log("data >> ", data);
      this.products = data;
    })
  }

}
