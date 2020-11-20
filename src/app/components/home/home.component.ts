import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Producto, ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: String;
  products: Producto[];
  loading: boolean = false;

  constructor(private productService: ProductService, private router: Router, private auth: AuthService) {
    this.products = []
  }

  ngOnInit(): void {
    this.getProductsMasBuscados();
  }

  getProductsMasBuscados() {
    this.loading = true;
    let id = this.auth.getUserIntoLS().id;
    this.productService.getByUser(id).subscribe(data => {
      this.products = data;
      this.loading = false;
    })
  }

  searchProducts() {
    this.search = this.search.replace(RegExp(/ /g), "+");
    this.router.navigate(['/search'], { queryParams: { filter: this.search } });
  }

}
