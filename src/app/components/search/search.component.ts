import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Producto, ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filter = "";
  productList: [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      let filter = param.filter;
      this.searchProduct(filter);
    })
  }

  searchProduct(filter: String) {
    this.loading = true;
    this.productService.searchProducts(filter).subscribe(result => {
      result.forEach((item: any) => item['data'].forEach((product: Producto) => product.store = item['store']));
      this.productList = [].concat.apply([], result.map((item: any) => item['data']));
      this.loading = false;
    })
  }

  findProduct(product: Producto) {
    product.user = this.auth.getUserIntoLS().id;
    this.productService.persist(product).subscribe(item => {
      console.log("ITEM >> ", item);

      this.router.navigate(['product', item.id]);
    });
  }

}
