import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Producto;
  products: Producto[] = [];
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      console.log(p['params']);
      let id = p['params']['id'];
      this.findProductById(id);
    })
  }

  findProductById(id: number) {
    this.productService.getById(id).subscribe(data => {
      this.product = data;
      this.getSimilarProducts(this.product.id);
    })
  }

  getSimilarProducts(idParent: number) {
    this.loading = true;
    this.productService.getRelated(idParent).subscribe(result => {
      this.products = result;
      // this.products.sort((a: Producto, b: Producto) => (a.price < b.price ? -1 : 1));
      this.loading = false;
    })
  }

  getScalaPrice(price: any): any {
    let prices = this.products.map((e: Producto) => e.price);
    let pos = prices.sort((a, b) => (a < b) ? -1 : 1).indexOf(price), color: String;

    if (pos == 0) {
      color = "bg-green";
    } else if (pos > 0 && ((pos * 100) / prices.length) < 30) {
      color = "bg-orange";
    } else {
      color = "bg-red";
    }
    return color;
  }

}
